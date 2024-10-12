import { config } from "dotenv";
import { Router } from "express";
import multer, { diskStorage } from "multer";
import { database } from "../db.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { authorizationFunction } from "../middlewares/authorization.js";
config();

const __dirname = dirname(fileURLToPath(import.meta.url));

const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "../../frontend/public/doctor_images"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now();
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

const router = Router();

router.post(
  "/add-doctor",
  authorizationFunction,
  upload.single("doctor_image"),
  async (req, res) => {
    try {
      // Values array
      const values = [
        req.file.filename,
        req.body.doctor_name,
        req.body.doctor_speciality,
        req.body.doctor_fees,
        req.body.doctor_experience,
        req.body.doctor_email,
        req.body.doctor_degree,
        req.body.doctor_address,
        req.body.about_doctor,
      ];

      // Correct the column name and ensure the query matches the number of values
      const query =
        "INSERT INTO doctor (doctor_image, doctor_name, doctor_speciality, doctor_fees, doctor_experience, doctor_email,doctor_degree, doctor_address, about_doctor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
      // Check if The Doctor is Existing or Not
      database.query(
        "SELECT * FROM doctor WHERE doctor_email = ?",
        req.body.doctor_email,
        (error, data) => {
          if (error) return res.status(403).json(error);
          if (data.length > 0) {
            return res
              .status(400)
              .json({ msg: "This Doctor is Already Existing" });
          } else {
            database.query(query, values, (error, data) => {
              if (error) {
                return res.status(403).json(error);
              }
              if (data)
                return res.status(200).json({ msg: "You Added New Doctor" });
            });
          }
        }
      );
      // Add The Doctor
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: process.env.INTERNAL_ERROR });
    }
  }
);

router.get("/get-doctors", async (req, res) => {
  try {
    database.query("SELECT * FROM doctor", (error, data) => {
      if (error) return res.status(500).json(error);
      if (data.length > 0) {
        return res.status(200).json(data);
      } else {
        return res.status(404).json({ msg: "No Doctors" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: process.env.INTERNAL_ERROR });
  }
});

router.get("/get-doctors/:id", async (req, res) => {
  try {
    const { id } = req.params;
    database.query("SELECT * FROM doctor WHERE id = ?", id, (error, data) => {
      if (error) return res.status(500).json(error);
      if (data.length > 0) {
        return res.status(200).json(data[0]);
      } else {
        return res.status(404).json({ msg: "No Doctor" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: process.env.INTERNAL_ERROR });
  }
});

router.delete("/delete-doctor/:id", authorizationFunction, async (req, res) => {
  try {
    const { id } = req.params;
    database.query("SELECT * FROM doctor WHERE id = ?", id, (error, data) => {
      if (error) return res.status(403).json(error);
      if (data.length > 0) {
        database.query(
          "DELETE FROM doctor WHERE id = ?",
          req.params.id,
          (error, data) => {
            if (error) return res.status(500).json(error);
            if (data) return res.status(200).json({ msg: "Doctor is Deleted" });
          }
        );
      } else {
        return res.status(404).json({ msg: "This Doctor Is Not Found" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: process.env.INTERNAL_ERROR });
  }
});

router.patch(
  "/dotor-available/:doctorId",
  authorizationFunction,
  async (req, res) => {
    try {
      database.query(
        "SELECT isAvailable FROM doctor WHERE id = ?",
        [req.params.doctorId],
        (error, data) => {
          if (error) return res.status(403).json(error);
          if (data.length > 0) {
            let isAvailable = data[0].isAvailable;
            isAvailable = !isAvailable;
            database.query(
              "UPDATE doctor SET isAvailable = ? WHERE id = ?",
              [isAvailable, req.params.doctorId],
              (error, data) => {
                if (error) return res.status(403).json(error);
                if (data) {
                  let message = isAvailable
                    ? "Doctor Now is Available"
                    : "Doctor Now is UnAvailable";
                  return res.status(200).json({ msg: message });
                }
              }
            );
          } else {
            return res.status(404).json({ msg: "This Doctor Is Not Found" });
          }
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: process.env.INTERNAL_ERROR });
    }
  }
);

export default router;
