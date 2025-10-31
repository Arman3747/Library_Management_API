import { Model, model, Schema } from "mongoose";
import { BookInstanceMethods, IBooks } from "../interfaces/book.interface";
import validator from "validator";

const bookSchema = new Schema<IBooks, Model<IBooks>, BookInstanceMethods>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      validate: {
        validator: (value) => !validator.isEmpty(value.trim()),
        message: "Title can't be empty",
      },
    },
    author: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      validate: {
        validator: (value) => !validator.isEmpty(value.trim()),
        message: "Title can't be empty",
      },
    },
    genre: {
      type: String,
      required: true,
      uppercase: true,
      enum: {
        values: [
          "FICTION",
          "NON_FICTION",
          "SCIENCE",
          "HISTORY",
          "BIOGRAPHY",
          "FANTASY",
        ],
        message: "GENRE is not valid, got {VALUE} !",
      },
    },
    isbn: {
      type: String,
      required: true,
      trim: true,
      unique: [true, "Not unique isbn !"],
      validate: [validator.isISBN, "Invalid isbn {VALUE} !"],
    },
    description: {
      type: String,
      trim: true,
    },
    copies: {
      type: Number,
      required: [true, "Copies are required"],
      min: [0, "Copies cannot be negative"],
      validate: {
        validator: (value: number) =>
          validator.isInt(String(value), { gt: -1 }),
        message: "Copies cannot be negative",
      },
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// Instance method
bookSchema.method("updateAvailability", async function (borrowQuantity: number) {
  this.copies -= borrowQuantity;
  if (this.copies <= 0) {
    this.copies = 0;
    this.available = false;
  }
  await this.save();
});

export const Book = model("Book", bookSchema);
