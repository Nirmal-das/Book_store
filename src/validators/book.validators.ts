import Joi from "joi";
import { IBookRequest } from "../common/interface.js";


export const createBookValidator = Joi.object<IBookRequest>({
    title: Joi.string().required(),
    author: Joi.string().required(),
    isbn: Joi.string().required(),
    publishedDate: Joi.date().optional(),
    copiesAvailable: Joi.number().optional()
});

export const updateBookValidator = Joi.object({
    title: Joi.string().optional(),
    author: Joi.string().optional(),
    isbn: Joi.string().optional(),
    publishedDate: Joi.date().optional(),
    copiesAvailable: Joi.number().optional(),
});