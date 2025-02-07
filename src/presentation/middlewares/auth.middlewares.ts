import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";

export class AuthMiddleware {
  static validateJWT = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    (async () => {
      const authorization = req.header("Authorization");

      if (!authorization) {
        res.status(401).json({ error: "No token provided" });
        return;
      }

      if (!authorization.startsWith("Bearer ")) {
        res.status(401).json({ error: "Invalid Bearer token" });
        return;
      }

      const token = authorization.split(" ").at(1) || "";

      try {
        const payload = await JwtAdapter.validateToken<{ id: string }>(token);
        if (!payload) return res.status(401).json({ error: "Invalid token" });
        const user = await UserModel.findById(payload.id);
        if (!user) return res.status(401).json({ error: "Invalid token" });
        console.log("user", user);
        req.body.user = user;
        next();
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
      }
    })().catch(next);
  };
}
