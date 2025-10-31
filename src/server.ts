import { Server } from "http";
import dotenv from 'dotenv';
import app from "./app";
import mongoose from "mongoose";
import path from "path";

let server: Server;
const port = 5000;

dotenv.config({ path: path.resolve(__dirname, "../.env") });

async function main() {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log("Connected to MongoDB using Mongoose !");
    server = app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
