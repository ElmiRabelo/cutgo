import { Router } from "express";

//multer
const multerConfig = require("./config/multer");
const upload = require("multer")(multerConfig);

const routes = Router();

//controllers
import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";

///////////////////////////////////////////////////
//rotas

//sigin
routes.get("/", SessionController.create);
routes.post("/signin", SessionController.store);

//signup
routes.get("/signup", UserController.create);
routes.post("/signup", upload.single("avatar"), UserController.store);

//dashboard
routes.get("/app/dashboard", (req, res) => {
  console.log(req.session.user);
  return res.render("dashboard");
});

export default routes;
