import { Router } from "express";

//multer
const multerConfig = require("./config/multer");
const upload = require("multer")(multerConfig);

const routes = Router();

//middlewares externos
import authMiddleware from "./app/middlewares/auth";
import guestMiddleware from "./app/middlewares/guest";

//controllers
import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";

///////////////////////////////////////////////////
//rotas

//sigin
routes.use("/app", authMiddleware);

routes.get("/", guestMiddleware, SessionController.create);
routes.post("/signin", SessionController.store);

//signup
routes.get("/signup", guestMiddleware, UserController.create);
routes.post("/signup", upload.single("avatar"), UserController.store);

//dashboard
routes.get("/app/dashboard", (req, res) => {
  console.log(req.session.user);
  return res.render("dashboard");
});

export default routes;
