import { Router } from "express";

//multer
const multerConfig = require("./config/multer");
const upload = require("multer")(multerConfig);

const routes = Router();

//controllers
import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";

//rotas
routes.get("/", SessionController.create);
routes.post("/signin", SessionController.store);

routes.get("/signup", UserController.create);
routes.post("/signup", upload.single("avatar"), UserController.store);

routes.get("/app/dashboard", (req, res) => {
  return res.render("dashboard");
});

export default routes;
