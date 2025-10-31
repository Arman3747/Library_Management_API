import { z } from "zod";
import mongoose from "mongoose";
import express, { Request, Response } from "express";
import { Book } from "../models/book.model";
import { CreateBookZodSchema, UpdateBookZodSchema } from "../schemas/book.schemas";

export const bookRoutes = express.Router();

//POST a book
bookRoutes.post("/books", async (req: Request, res: Response) => {
  try {
    // ZOD validate
    const body = await CreateBookZodSchema.parseAsync(req.body);
    const savedBook = await Book.create(body);

    const err = savedBook.validateSync();

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: savedBook,
    });
  } catch (error : any) {
    if (error instanceof z.ZodError) {


    //   const formattedErrors = error.map((err) => ({
    //     field: err.path.join("."),
    //     message: err.message,
    //   }));

      // console.log(error, "zod");
      return res.status(400).json({
        message: "Validation failed 01",
        success: false,
        error: error,
      });
    }

    // Mongoose validation errors
    if (error.name === "ValidationError") {
      // console.log(error);
      return res.status(400).json({
        name: error.name,
        message: "Validation failed 02",
        success: false,
        error,
      });
    }

    // Other errors (server/database)
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error,
    });
  }
});

// GET all Books
bookRoutes.get("/books", async (req: Request, res: Response) => {
  try {
    const { filter, sortBy = "createdAt", sort = "asc", limit = "10" } = req.query;

    const query: any = {};
    if (filter) {
      query.genre = filter;
    }

    const sortOrder = sort === "desc" ? -1 : 1;
    const sortOptions: any = {};
    sortOptions[sortBy as string] = sortOrder;

    const limitValue = Number(limit) || 10;

    const books = await Book.find(query)
      .sort(sortOptions)
      .limit(limitValue);

    if (!books || books.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No books found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: (error as Error).message,
    });
  }
});

// GET a Single book
bookRoutes.get("/books/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: (error as Error).message,
    });
  }
});

//PATCH a single book
bookRoutes.patch("/books/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    //ZOD validate
    const updatedBody = await UpdateBookZodSchema.parseAsync(req.body);
    const updatedBook = await Book.findByIdAndUpdate(bookId, updatedBody, {
      new: true,
    });

    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating book",
      error,
    });
  }
});

//DELETE a book
bookRoutes.delete("/books/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: (error as Error).message,
    });
  }
});
