import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";
import { IApiRequest, IApiResponse, ILogin, IRegister } from "../common/interface.js";
import { Response } from "express"
import { CONSTANT_MESSAGE } from "../common/constant.js";


const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const registerUser = async (req: IApiRequest<IRegister>): Promise<IApiResponse> => {
    const response: IApiResponse = {
        statusCode: 400,
        status: CONSTANT_MESSAGE.STATUS.ERROR,
        message: CONSTANT_MESSAGE.MESSAGE.SOMETHING_WENT_WRONG,
        data: null
    };

    try {
        const { name, email, username, password } = req;
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            response.statusCode = 409;
            response.message = CONSTANT_MESSAGE.MESSAGE.USER_EXISTS;
            response.status = CONSTANT_MESSAGE.STATUS.ERROR;
            return response;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, username, password: hashedPassword });
        await user.save();
        response.statusCode = 201;
        response.message = CONSTANT_MESSAGE.MESSAGE.USER_REGISTERED;
        response.status = CONSTANT_MESSAGE.STATUS.SUCCESS;
    }
    catch (error: any) {
        console.error('[ERROR]  in User Registeration', error?.message);
        response.data = error?.response?.data || error?.message;
    }
    return response;
}

export const loginUser = async (req: IApiRequest<ILogin>): Promise<IApiResponse> => {
    const response: IApiResponse = {
        statusCode: 400,
        status: CONSTANT_MESSAGE.STATUS.ERROR,
        message: CONSTANT_MESSAGE.MESSAGE.SOMETHING_WENT_WRONG,
        data: null
    };
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            response.statusCode = 404;
            response.message = CONSTANT_MESSAGE.MESSAGE.USER_NOT_FOUND;
            response.status = CONSTANT_MESSAGE.STATUS.ERROR;
            return response;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            response.statusCode = 401;
            response.message = CONSTANT_MESSAGE.MESSAGE.INVALID_CREDENTIALS;
            response.status = CONSTANT_MESSAGE.STATUS.ERROR;
            return response;
        }
        const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: "1h" });
        response.statusCode = 200;
        response.message = CONSTANT_MESSAGE.MESSAGE.USER_LOGIN;
        response.status = CONSTANT_MESSAGE.STATUS.SUCCESS;
        response.data = token;

    } catch (error: any) {
        console.error('[ERROR]  in User Login', error?.message);
        response.data = error?.response?.data || error?.message;
    }
    return response;
} 