import { Router } from "express";
import { sendBattle } from "../controllers/battleController.js";
import { validateJoi } from "../middlewares/joiValidationMiddleware.js";
import { battleSchema } from "../schemas/battleSchema.js";

export const battleRouter = Router();

battleRouter.post("/battle", validateJoi(battleSchema), sendBattle);