import { Router } from "express";
import { Response } from "express";
import { createBookService,getAllBooksService,
    getBookByIdService,
    updateBookService,
    deleteBookService } from "../services/book.service.js";
import { IApiRequest, IApiResponse, IBookRequest } from "../common/interface.js";
import { createBookValidator, updateBookValidator } from "../validators/book.validators.js";

const BookRouter = Router();

BookRouter.post("/create", async (req: IApiRequest<IBookRequest>, res: Response<IApiResponse>) => {
    try {
        await createBookValidator.validateAsync(req?.body);
        const serviceResponse = await createBookService(req);
        return res.status(serviceResponse.statusCode).send(serviceResponse);
    } catch (error: any) {
        console.error('[ERROR] in createBook controller: ', error);
        return res.status(400).send({ statusCode: 400, status: "error", message: error.message });
    }
});

BookRouter.get("/list", async (req: IApiRequest<any>, res: Response<IApiResponse>) => {
    try {
        const serviceResponse = await getAllBooksService();
        return res.status(serviceResponse.statusCode).send(serviceResponse);
    } catch (error: any) {
        console.error('[ERROR] in listBooks controller: ', error);
        return res.status(400).send({ statusCode: 400, status: "error", message: error.message });
    }
});

BookRouter.get("/:id", async (req: IApiRequest<any>, res: Response<IApiResponse>) => {
    try {
        const serviceResponse = await getBookByIdService(req.params.id);
        return res.status(serviceResponse.statusCode).send(serviceResponse);
    } catch (error: any) {
        console.error('[ERROR] in getBookById controller: ', error);
        return res.status(404).send({ statusCode: 404, status: "error", message: error.message });
    }
});

BookRouter.put("/:id", async (req: IApiRequest<IBookRequest>, res: Response<IApiResponse>) => {
    try {
        await updateBookValidator.validateAsync(req?.body);
        const serviceResponse = await updateBookService(req.params.id, req.body);
        return res.status(serviceResponse.statusCode).send(serviceResponse);
    } catch (error: any) {
        console.error('[ERROR] in updateBook controller: ', error);
        return res.status(400).send({ statusCode: 400, status: "error", message: error.message });
    }
});

BookRouter.delete("/:id", async (req: IApiRequest<any>, res: Response<IApiResponse>) => {
    try {
        const serviceResponse = await deleteBookService(req.params.id);
        return res.status(serviceResponse.statusCode).send(serviceResponse);
    } catch (error: any) {
        console.error('[ERROR] in deleteBook controller: ', error);
        return res.status(400).send({ statusCode: 400, status: "error", message: error.message });
    }
});

export default BookRouter;
