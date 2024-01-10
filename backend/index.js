import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

// Middlware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
app.use(cors(
    {
        origin: [""],
        methods: ["POST", "GET", "PUT", "DELETE"],
        credentials: true
    }
))

app.get("/", (request, response) => {
    console.log(request)
    return response.status(234).send("Homepage");
});

app.use("/books", booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("App connected to database");
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        })
    })
    .catch((error) => {
        console.log(error)
    })
