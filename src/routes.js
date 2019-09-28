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
import DashboardController from "./app/controllers/DashboardController";
import FileController from "./app/controllers/FileController";
import AppointmentController from "./app/controllers/AppointmentController";
import AvailableController from "./app/controllers/AvailableController";

///////////////////////////////////////////////////
//rotas

routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash("success");
  res.locals.flashError = req.flash("error");

  return next();
});

//rota para lidar com arquivos
routes.get("/files/:file", FileController.show);

//sigin
routes.use("/app", authMiddleware);

routes.get("/", guestMiddleware, SessionController.create);
routes.post("/signin", SessionController.store);

//signup
routes.get("/signup", guestMiddleware, UserController.create);
routes.post("/signup", upload.single("avatar"), UserController.store);

//dashboard
routes.get("/app/dashboard", DashboardController.index);

//logout
routes.get("/app/logout", SessionController.destroy);

//appointments
routes.get("/app/appointments/new/:provider", AppointmentController.create);
routes.post("/app/appointments/new/:provider", AppointmentController.store);

//available
routes.get("/app/available/:provider", AvailableController.index);

export default routes;
