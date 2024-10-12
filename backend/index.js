import express from "express";
import { config } from "dotenv";
import cors from "cors";
import "./db.js";
import userRouter from "./routes/user.js";
import doctorRouter from "./routes/doctor.js";

config();

const app = express();

app.use(
  cors({
    origin: "https://doctor-appointment-booking-system-xi.vercel.app",
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);
app.use(express.json());

const api = "/api";

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Hello World" });
});

app.use(api, userRouter);
app.use(api, doctorRouter);

app.listen(port, () =>
  console.log(`Server is Running on Port ${port} http://localhost:${port}`)
);
