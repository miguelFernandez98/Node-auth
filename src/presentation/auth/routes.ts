import { Router } from "express";
import { AuthController } from "./controller";
import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infrastructure";
import { AuthMiddleware } from "../middlewares/auth.middlewares";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    //base da datos en uso
    const database = new AuthDatasourceImpl();

    const authRepository = new AuthRepositoryImpl(database);

    const controller = new AuthController(authRepository);
    // Definir todas mis rutas principales
    router.post("/login", controller.loginUser);
    router.post("/register", controller.registerUser);
    router.get("/", [AuthMiddleware.validateJWT], controller.getUsers);
    return router;
  }
}
