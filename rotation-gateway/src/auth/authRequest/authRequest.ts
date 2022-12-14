import { Request } from "express";
import { User } from "src/entity/User";

export interface AuthRequest extends Request {
    user: User
}