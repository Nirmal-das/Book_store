import { IApiRequest, IBookRequest } from "../common/interface.js";
import { Book } from "../model/bookModel.js";



export const createBookService = async (req: IApiRequest<IBookRequest>) => {
    const book = new Book(req.body);
    await book.save();

    return {
        statusCode: 201,
        status: "success",
        message: "Book created successfully",
        data: book,
    };
};

export const getAllBooksService = async () => {
    const books = await Book.find();
    return {
        statusCode: 200,
        status: "success",
        data: books,
    };
};

export const getBookByIdService = async (id: string) => {
    const book = await Book.findById(id);
    if (!book) {
        throw new Error("Book not found");
    }
    return {
        statusCode: 200,
        status: "success",
        data: book,
    };
};

export const updateBookService = async (id: string, body: IBookRequest) => {
    const book = await Book.findByIdAndUpdate(id, body, { new: true });
    if (!book) {
        throw new Error("Book not found");
    }
    return {
        statusCode: 200,
        status: "success",
        message: "Book updated successfully",
        data: book,
    };
};

export const deleteBookService = async (id: string) => {
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
        throw new Error("Book not found");
    }
    return {
        statusCode: 200,
        status: "success",
        message: "Book deleted successfully",
    };
};
