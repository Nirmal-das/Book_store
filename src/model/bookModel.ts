import { Schema, model } from "mongoose";

const BookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  isbn: {
    type: String,
    required: true,
    unique: true
  },
  publishedDate: {
    type: Date
  },
  copiesAvailable: {
    type: Number,
    default: 1
  },
});

export const Book = model('Book', BookSchema);
