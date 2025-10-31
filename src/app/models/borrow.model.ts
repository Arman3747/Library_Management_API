import { model, Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";
import validator from "validator";

const borrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "BookId is required"],
      validate: {
        validator: (val: unknown) =>
          typeof val === "string"
            ? validator.isMongoId(val)
            : validator.isMongoId(String(val)),
        message: "Invalid MongoDbId",
      },
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be a positive integer"],
      validate: {
        validator: (value: number) =>
          validator.isInt(String(value), { gt: 0 }),
        message: "Quantity must be a positive integer",
      },
    },
    dueDate: {
      type: Date,
      required: [true, "DueDate is required"],
      validate: {
        validator: (val: unknown) =>
          typeof val === "string" ? validator.isDate(val) : true,
        message: "Invalid Date",
      },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Borrow = model("Borrow", borrowSchema);
