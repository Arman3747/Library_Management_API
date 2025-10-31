import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";

let server: Server;
const port = 5000;

async function main() {
  try {
    await mongoose.connect('mongodb+srv://mongodb:mongodb@cluster0.nnagfsm.mongodb.net/library-management-app?retryWrites=true&w=majority&appName=Cluster0');
    console.log("Connected to MongoDB using Mongoose !");
    server = app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
