import mongoose from "mongoose";
import z from "zod";
// ZOD -> schema validation

export const CreateBorrowZodSchema = z.object({
  book: z.preprocess((val) => {
    if (val instanceof mongoose.Types.ObjectId) {
      return val.toString();
    }
    return val;
  }, z.string({ message: "Invalid MongoDB ObjectId format" }).regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid MongoDB ObjectId format" })),

  quantity: z
    .number()
    .int()
    .nonnegative({ message: "Copies must be a positive number" }),
  available: z.boolean().default(true),

  dueDate: z.preprocess((val) => {
    if (typeof val === "string" || typeof val === "number") {
      const parsed = new Date(val);
      if (!isNaN(parsed.getTime())) return parsed;
    }
    return val;
  }, z.date({ message: "Due date is required" })),
});
