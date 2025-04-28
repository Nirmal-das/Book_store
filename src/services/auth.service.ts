import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";


const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export async function registerUser({ name, email, username, password }: { name: string, email: string, username: string, password: string }) {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) throw new Error("Email or username already exists");
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, username, password: hashedPassword });
    await user.save();
    return user;
}

export async function loginUser({ username, password }: { username: string, password: string }) {
    const user = await User.findOne({ username });
    if (!user) throw new Error("Invalid credentials");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");
    const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: "1h" });
    return token;
} 