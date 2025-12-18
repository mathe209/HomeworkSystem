// requireAuth.ts
//import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");

type JwtPayload = { id: number; name: string; email: string };

export function requireAuth1(req: any, res: any, next: any) {
//   const header = req.headers.authorization;
//   const token = header?.startsWith("Bearer ") ? header.slice(7) : null;
    const token = req.cookies?.auth_token;


    if (!token) {
        return res.status(401).json({ message: "Missing token" });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        (req as any).user = payload; // if you haven't added TS augmentation yet
        return next();
    } catch {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}
