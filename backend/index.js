import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";


const app = express();
var cors = require('cors');

app.use(cors())

// Middlware for parsing request body
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://project-8-self.vercel.app"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);
  next();
});

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
