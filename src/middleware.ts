const jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";
import { UserPayload } from "./types/express/auth"; // <-- import your app's type

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization; // "Bearer <token>"
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: "Missing token" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as unknown as UserPayload;
    // runtime check to ensure required fields are present
    if (!payload.name) {
      return res.status(401).json({ message: "Invalid token payload" });
    }
    req.user = payload;
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid/expired token" });
  }
}
