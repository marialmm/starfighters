import { Router } from "express";
import "express-async-errors";

import { handleError } from "../middlewares/handleErrorMiddleware.js";
import { battleRouter } from "./battleRouter.js";
import { userRouter } from "./userRouter.js";

const router = Router();

router.use(battleRouter);
router.use(userRouter)
router.use(handleError)

export default router;