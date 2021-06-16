import express from "express";
import { authenticateUser } from "../controllers/user-controller";
import { controllerLogger } from "../loggers/controller-logger";

const authRouter = express.Router();

authRouter.route('/')
	.post(controllerLogger(authenticateUser));

export { authRouter };
