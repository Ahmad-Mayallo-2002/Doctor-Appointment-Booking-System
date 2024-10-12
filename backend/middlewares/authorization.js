import { config } from "dotenv";
// import { verify } from "jsonwebtoken";
import pkg from "jsonwebtoken";

const { verify } = pkg;

config();

export const authorizationFunction = async (req, res, next) => {
  try {
    const token =
      req.headers["authorization"] &&
      req.headers["authorization"].split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ msg: "Token is Expired or Not Existing Sign In Again" });
    }

    verify(token, process.env.JWT_KEY, (error, user) => {
      if (error) return res.status(403).json(error);
      req.user = user;
      next();
    });
  } catch (error) {
    console.log(error);
  }
};
