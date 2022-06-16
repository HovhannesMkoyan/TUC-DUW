import express, { Application } from "express";
import path from "path";
import cors from "cors";
import logger from "morgan";

require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
import { registerDependencies } from "./dependency-injection-setup";
registerDependencies();

import sequelize from "./src/db/models";

import bookRouter from "./src/routes/fileRouter";

const app: Application = express();

app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(logger("dev"));

app.use(express.static(path.join(__dirname, "public")));
app.use(
  express.static(path.join(__dirname, path.resolve(__dirname, "/src/static")))
);

app.use("/api/books", bookRouter);

export { app, sequelize };
