import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service.js";
import { registerSchema, loginSchema } from "../validators/auth.validators.js";

export async function register(req: Request, res: Response) {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    await registerUser(req.body);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error: any) {
    if (error.message === "Email or username already exists") {
      return res.status(409).json({ message: error.message });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export async function login(req: Request, res: Response) {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const token = await loginUser(req.body);
    res.json({ token });
  } catch (error: any) {
    if (error.message === "Invalid credentials") {
      return res.status(401).json({ message: error.message });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
} 