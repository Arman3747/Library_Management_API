import express, { Application, Request, Response } from "express";
import { bookRoutes } from "./controllers/book.controller";
import { borrowRoutes } from "./controllers/borrow.controller";

const app: Application = express();

app.use(express.json());

app.use("/api", bookRoutes);
app.use("/api", borrowRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Making - Library Management API with TypeScript, Express.js, MongoDB, Mongoose.js & Zod !!!");
});

export default app;
