import jwt from "jsonwebtoken";

export class JwtAdapter {
  static async generateToken(
    payload: object,
    duration: string | number = "2h"
  ): Promise<string | null> {
    return new Promise((resolve) => {
      const secret: jwt.Secret = "SEED";
      const options: jwt.SignOptions = {
        expiresIn: duration as any,
      };
      jwt.sign(payload, secret, options, (err, token) => {
        if (err) return resolve(null);
        resolve(token!);
      });
    });
  }

  static validateToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(token, "SEED", (err, decoded) => {
        if (err) return resolve(null);
        resolve(decoded as T);
      });
    });
  }
}
