import {Router} from "express";
import { getRanking } from "../controllers/userController.js";

export const userRouter = Router();

userRouter.get("/ranking", getRanking)