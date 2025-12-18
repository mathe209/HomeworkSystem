import "express-serve-static-core";
import { UserPayload } from "./auth";

declare module "express-serve-static-core" {
  interface Request {
    user?:UserPayload 
  }
}
