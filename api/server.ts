import express, { Application } from "express";
import path from "path";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import logger from "morgan";
import setupAdmin from "./admin";

require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
import { registerDependencies } from "./dependency-injection-setup";
registerDependencies();

import sequelize from "./src/db/models";
import passportConfig from "./src/config/passport";

import authRouter from "./src/routes/authRouter";
import bookRouter from "./src/routes/bookRouter";
import userRouter from "./src/routes/userRouter";

const webAppBuildPath =
  process.env.NODE_ENV === "production"
    ? path.resolve(__dirname, "../../web-app", "build")
    : path.resolve(__dirname, "../web-app", "build");

// initalize sequelize with session store
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app: Application = express();

app.use(
  express.json({
    verify: function (req: any, _: any, buf: any) {
      if (
        req.originalUrl.includes(
          "/838c07a5c24f46ec2a8cb167be488d7530843f41e885d7c8e49c401756b25ea0" // custom string hash
        )
      ) {
        req.rawBody = buf.toString();
      }
    },
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.set("trust proxy", 1);
app.use(
  session({
    secret: "oCRQJq0extilzT0MILLC",
    name: "sid",
    store: new SequelizeStore({
      db: sequelize,
    }),
    resave: false,
    proxy: true, // if you do SSL outside of node.
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "development" ? false : "none",
      secure: process.env.NODE_ENV === "development" ? false : true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

setupAdmin(app);

app.use(
  helmet({
    contentSecurityPolicy: false, // set in front-end, in a meta tag
  })
);
app.use(logger("dev"));

app.use(express.static(path.join(__dirname, "public")));
app.use(
  express.static(path.join(__dirname, path.resolve(__dirname, "/src/static")))
);
app.use(express.static(webAppBuildPath));

app.use("/api/books", bookRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

// All other undefined routes will be handled here
// app.use((req: Request, res: Response, next) => {
//   return res.status(500).send({
//     success: false,
//     message: "An error occured while processing the request",
//   });
// });

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(webAppBuildPath, "index.html"));
});

export { app, sequelize };
