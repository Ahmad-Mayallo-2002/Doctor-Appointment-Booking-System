import { hashSync, compareSync, compare } from "bcrypt";
import { Router } from "express";
import { authorizationFunction } from "../middlewares/authorization.js";
import multer, { diskStorage } from "multer";
import { config } from "dotenv";
import { database } from "../db.js";
import path, { dirname, resolve } from "path";
import pkg from "jsonwebtoken";
import { fileURLToPath } from "url";

config();

const { sign } = pkg;
const __dirname = dirname(fileURLToPath(import.meta.url));

const upload = multer({
  storage: diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "../../frontend/public/users_images"));
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now();
      cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
  }),
});

const router = Router();

router.post("/sign-up", upload.single("user_image"), async (req, res) => {
  try {
    //   Body Request
    const { username, email, password, role } = req.body;
    // Hash Password
    const hashPassword = hashSync(password, 10);
    // Check If Email Is Existing
    database.query(
      "SELECT * FROM user WHERE email = ?",
      [email],
      //   Error Condition
      (error, data) => {
        if (error) return res.status(403).json(error);
        if (data.length > 0)
          return res.status(400).json({ msg: "This Email is Already Exist" });
        // Start Query Setting
        let q;
        let values = [username, email, hashPassword, role];
        //    Check If There Is Image or Not
        if (req.file) {
          q =
            "INSERT INTO user (username,email,password,user_image) VALUES (?,?,?,?)";
          values.push(req.file.filename);
        } else {
          q = "INSERT INTO user (username,email,password) VALUES (?,?,?)";
        }
        if (user_role)
          q =
            "INSERT INTO user (username,email,password,user_role) VALUES (?,?,?,?)";
        //   Check The Sign Up is Done or Not
        database.query(q, values, (error, data) => {
          if (error) return res.status(400).json(error);
          if (data) return res.status(200).json({ msg: "Sign Up is Done" });
        });
      }
    );
  } catch (error) {
    // console.log(error);
    console.log(req.body);
    res.status(500).json({ msg: process.env.INTERNAL_ERROR });
  }
});

router.post("/login", async (req, res) => {
  try {
    //   Request Body
    const { email, password } = req.body;
    // Check if the User is Exist or Not
    database.query(
      "SELECT * FROM user WHERE email = ?",
      [email],
      (error, data) => {
        if (error) return res.status(403).json(error);
        //   User Fount or Not
        if (data.length === 0) {
          return res.status(404).json({ msg: "Invalid Email" });
        }
        // Password Check And JWT
        const userpassword = data[0]?.password;
        const isPasswordMatch = compareSync(password, userpassword);
        if (!isPasswordMatch)
          return res.status(404).json({ msg: "Invalid password" });
        // Payload
        const payload = [{ username: data[0]?.username }, { id: data[0]?.id }];
        // Token
        const token = sign({ payload }, process.env.JWT_KEY, {
          expiresIn: "30d",
        });
        return res.status(200).json({
          token: token,
          id: data[0]?.id,
        });
      }
    );
  } catch (error) {
    console.log(req.body);
    res.status(500).json({ msg: process.env.INTERNAL_ERROR });
  }
});

router.get("/get-users", authorizationFunction, async (req, res) => {
  try {
    const q = "SELECT * FROM user";
    database.query(q, (error, data) => {
      if (error) return res.status(400).json(error);
      if (data.length === 0)
        return res.status(404).json({ msg: "There Is No Users" });
      return res.status(200).json(data);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: process.env.INTERNAL_ERROR });
  }
});

router.get("/get-users/:id", authorizationFunction, async (req, res) => {
  try {
    const q = "SELECT * FROM user WHERE id = ?";
    database.query(q, [req.params.id], (error, data) => {
      if (error) return res.status(400).json(error);
      if (data.length === 0)
        return res.status(404).json({ msg: "There Is No User" });
      return res.status(200).json(data[0]);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: process.env.INTERNAL_ERROR });
  }
});

router.delete("/delete-user/:id", authorizationFunction, async (req, res) => {
  try {
    const { id } = req.params;
    const q = "DELETE FROM user WHERE id = ?";
    database.query("SELECT * FROM user WHERE id = ?", id, (error, data) => {
      if (error) return res.status(403).json(error);
      if (data.length > 0) {
        database.query(q, id, (error, data) => {
          if (error) return res.status(403).json(error);
          return res.status(200).json({ msg: "User is Deleted" });
        });
      } else {
        return res.status(404).json({ msg: "User is not Found" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: process.env.INTERNAL_ERROR });
  }
});

router.patch(
  "/update-user/:id",
  authorizationFunction,
  upload.single("user_image"),
  async (req, res) => {
    try {
      // Request Body
      const { username, email, password, age } = req.body;
      //   Array for What Will be Updated
      let updates = [];
      //   Values for Request That Will be Updated
      let values = [];
      if (username) {
        updates.push("username = ?");
        values.push(username);
      }
      if (email) {
        updates.push("email = ?");
        values.push(email);
      }
      if (age) {
        updates.push("age = ?");
        values.push(age);
      }
      if (password) {
        const hashPassword = hashSync(password, 10);
        updates.push("password = ?");
        values.push(hashPassword);
      }
      if (req.file) {
        updates.push("user_image = ?");
        values.push(req.file.filename);
      }
      const q = `UPDATE user SET ${updates.join(", ")} WHERE id = ?`;
      database.query(q, [...values, req.params.id], (error, data) => {
        if (error) return res.status(403).json(error);
        return res.status(200).json({ msg: "Update User Data is Done" });
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: process.env.INTERNAL_ERROR });
    }
  }
);

router.get("/user-doctors", authorizationFunction, async (req, res) => {
  try {
    const q =
      "SELECT doctor.id, doctor.doctor_name, doctor.doctor_image, doctor_speciality, doctor.doctor_fees FROM user_doctors JOIN doctor ON user_doctors.doctor_id = doctor.id WHERE user_doctors.user_id = ?";
    database.query(q, req.headers.id, (error, data) => {
      if (error) return res.status(403).json(error);
      if (data.length > 0) {
        return res.status(200).json(data);
      } else {
        return res.status(404).json({ msg: "No Doctors For You" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/add-user-doctor/:id", authorizationFunction, async (req, res) => {
  try {
    database.query(
      "SELECT * FROM user_doctors WHERE doctor_id = ?",
      req.params.id,
      (error, data) => {
        if (error) return res.status(403).json(error);
        if (data.length > 0)
          return res
            .status(400)
            .json({ msg: "This Doctor is Already Existing" });
        database.query(
          "INSERT INTO user_doctors (user_id, doctor_id) VALUES (?, ?)",
          [req.headers.id, req.params.id],
          (error, data) => {
            if (error) return res.status(403).json(error);
            if (data)
              return res.status(200).json({ msg: "This Doctor is Added" });
          }
        );
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.delete(
  "/delete-user-doctor/:id",
  authorizationFunction,
  async (req, res) => {
    try {
      database.query(
        "DELETE FROM user_doctors WHERE doctor_id = ?",
        req.params.id,
        (error, data) => {
          if (error) return res.status(403).json(error);
          if (data)
            return res.status(200).json({ msg: "You Deleted This Doctor" });
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
);

export default router;
