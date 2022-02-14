import express from "express";
import cors from "cors";
const bodyParser = require("body-parser");
import mongoose from "mongoose";
import pasteRouter from "./routers/pastesRouter";
import {
  middlewarePageNotFound,
  middlewareServerError,
} from "./middlewares/errorHandlers";

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(middlewareServerError);
app.use(middlewarePageNotFound);
app.use("/", pasteRouter);

mongoose
  .connect(
    "mongodb://root:example@mongo:27017/pastes-database?authSource=admin"
  )
  .then(() => {
    console.log("connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(4000, () => {
  console.log(`Application started`);
});
