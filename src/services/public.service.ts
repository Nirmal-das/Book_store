import { CONSTANT_MESSAGE } from "../common/constant";
import { IApiResponse } from "../common/interface";
import { Request, Response } from "express";

export const healthCheck = async (req: Request, res: Response): Promise<Response> => {
    const response: IApiResponse = {
        statusCode: 200,
        status: CONSTANT_MESSAGE.STATUS.SUCCESS,
        message: CONSTANT_MESSAGE.MESSAGE.SUCCESSFULLY_FETCHED,
    };

    return res.status(response.statusCode).send(response);
};