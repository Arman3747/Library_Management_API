import { z } from "zod";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { Borrow } from "../models/borrow.model";
import { CreateBorrowZodSchema } from "../schemas/borrow.schemas";
import { Book } from "../models/book.model";

export const borrowRoutes = express.Router();

//POST a book
borrowRoutes.post("/borrow", async (req: Request, res: Response) => {
  try {

    const body = await CreateBorrowZodSchema.parseAsync(req.body);
    const { book: bookId, quantity, dueDate } = body;

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    if (book.copies < quantity) {
      return res.status(400).json({
        success: false,
        message: `Not enough copies available. Only ${book.copies} left.`,
      });
    }

    // book.copies -= quantity;
    // if (book.copies === 0) {
    //   book.available = false;
    // }
    // await book.save();

    await book.updateAvailability(quantity);

    const borrowRecord = await Borrow.create({
      book: book._id,
      quantity,
      dueDate,
    });

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrowRecord,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      console.log(error);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        error: error,
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Mongoose validation failed",
        error,
      });
    }

    console.error("Error borrowing book:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});


borrowRoutes.get("/borrow", async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      { $unwind: "$bookDetails" },
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookDetails.title",
            isbn: "$bookDetails.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);

    if (!summary || summary.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No borrowed books found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (error) {
    console.error("Error fetching borrow summary:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: (error as Error).message,
    });
  }
});