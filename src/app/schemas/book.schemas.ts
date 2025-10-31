import z from "zod";

// ZOD -> schema validation
const GenreEnum = z.enum([
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
]);


export const CreateBookZodSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  genre: GenreEnum,
  isbn: z.string().min(1),
  description: z.string().optional(),
  copies: z
    .number()
    .int()
    .nonnegative({ message: "Copies must be a positive number" }),
  available: z.boolean().default(true),
});


//to FIX default properties while update
export const UpdateBookZodSchema = CreateBookZodSchema.omit({ available: true })
  .partial()
  .extend({
    available: z.boolean().optional(),
  });
