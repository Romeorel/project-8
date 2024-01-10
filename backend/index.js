import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

// Middlware for parsing request body
app.use(express.json());

app.use(cors(
    {
    origin: ['https://project-8-self.vercel.app/'],
    allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Methods", "Access-Control-Request-Headers"],
    credentials: true,
    enablePreflight: true
}
));

app.options('*', cors(
    {
    origin: ['https://project-8-self.vercel.app'],
    allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Methods", "Access-Control-Request-Headers"],
    credentials: true,
    enablePreflight: true
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
