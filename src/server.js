import express from "express";
import session from "express-session";
const FileStore = require("session-file-store")(session);
import nunjucks from "nunjucks";
import path from "path";
import routes from "./routes";
import flash from "connect-flash";

class App {
  constructor() {
    this.express = express();
    this.isDev = process.env.NODE_ENV !== "production";

    this.middlewares();
    this.views();
    this.routes();
  }

  middlewares() {
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(flash());
    //express session resposável por configurar o a perpetuação do login do user
    this.express.use(
      session({
        name: "root",
        secret: "MyAppSecret",
        resave: true,
        store: new FileStore({
          path: path.resolve(__dirname, "..", "tmp", "sessions")
        }),
        saveUninitialized: true
      })
    );
  }

  views() {
    nunjucks.configure(path.resolve(__dirname, "app", "views"), {
      autoescape: true,
      express: this.express,
      watch: this.isDev
    });
    this.express.use(express.static(path.resolve(__dirname, "public")));
    this.express.set("view engine", "njk");
  }

  routes() {
    this.express.use(routes);
  }
}

export default new App().express;
