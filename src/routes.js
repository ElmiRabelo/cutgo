import { Router } from "express";

//multer
const multerConfig = require("./config/multer");
const upload = require("multer")(multerConfig);

const routes = Router();

//controllers
import UserController from "./app/controllers/UserController";

routes.get("/signup", UserController.create);
routes.post("/signup", upload.single("avatar"), UserController.store);

export default routes;
