import { CONSTANT_MESSAGE } from "../common/constant.js";
import { IApiResponse } from "../common/interface.js";
import { Request, Response, RequestHandler } from "express";

export const healthCheck: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const response: IApiResponse = {
        statusCode: 200,
        status: CONSTANT_MESSAGE.STATUS.SUCCESS,
        message: CONSTANT_MESSAGE.MESSAGE.SUCCESSFULLY_FETCHED,
    };

    res.status(response.statusCode).send(response);
};