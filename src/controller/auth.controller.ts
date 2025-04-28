import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service.js";
import { registerSchema, loginSchema } from "../validators/auth.validators.js";
import { CONSTANT_MESSAGE } from "../common/constant.js";

export async function register(req: Request, res: Response) {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const registerUserResponse =await registerUser(req.body);
    return res.status(registerUserResponse?.statusCode).send(registerUserResponse)
  } catch (error: any) {
    return res.status(500).json({ statusCode: 500, status: CONSTANT_MESSAGE.STATUS.ERROR, message: error.message });
  }
}

export async function login(req: Request, res: Response) {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const token = await loginUser(req.body);
    res.json({res});
  } catch (error: any) {
    if (error.message === "Invalid credentials") {
      return res.status(401).json({res});
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
} 