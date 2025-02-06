import { NextFunction, Request, Response } from "express";

export class AuthMiddleware {
  static validateJWT = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const authorization = req.header("Authorization");

    if (!authorization) {
      res.status(401).json({ error: "No token provided" });
      return;
    }

    if (!authorization.startsWith("Bearer ")) {
      res.status(401).json({ error: "Invalid Bearer token" });
      return;
    }

    const token = authorization.split(" ").at(1) || ""; // Corregido split(" ")

    try {
      // Ejemplo de verificación con JWT
      // const payload = jwt.verify(token, 'your-secret-key');
      // req.body.user = payload;
      req.body.token = token;
      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
  };
}
