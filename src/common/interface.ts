import { Request } from "express";

export type IApiResponse<T = any | null> = {
    data?: T,
    statusCode: number,
    status: string,
    message?: string,
};
export interface IApiRequest<Body = any, Query = any, Param = string | string[] | any, ResponseBody = any> extends Request<Param, ResponseBody, Body, Query> {
};
export interface IBookRequest {
    title: string;
    author: string;
    isbn: string;
    publishedDate?: Date;
    copiesAvailable?: number;
}

export interface IRegister{
    name: string;
    email: string;
    username: string;
    password: string;
}

export interface ILogin{
    username: string;
    password: string;
}