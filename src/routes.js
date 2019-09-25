import { Router } from "express";
import UserController from "./app/controllers/UserController";

const routes = Router();

routes.get("/signup", UserController.create);
routes.post("signup", UserController.store);

export default routes;
