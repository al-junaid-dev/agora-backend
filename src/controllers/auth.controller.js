import jwt from "jsonwebtoken";
import { users } from "../data/users.data.js";
import { ApiError } from "../utils/ApiError.js";

const JWT_SECRET = "agora_secret_key";

export const login = (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError(400, "Email and password are required");
    }

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      throw new ApiError(401, "Invalid credentials");
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      token,
      role: user.role,
    });
  } catch (error) {
    next(error);
  }
};
