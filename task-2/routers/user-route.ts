import express from "express";
import { createUser, deleteUser, getUserById, getUsers, updateUser } from "../controllers/user-controller";
import { addUsersToGroup } from "../controllers/user-group-controller";
import { controllerLogger } from "../loggers/controller-logger";
import { validators } from "../validators/validators";

const userRouter = express.Router();

userRouter.route('/')
	.post(validators.newUser, controllerLogger(createUser))
	.get(validators.getUserQuery, controllerLogger(getUsers));

userRouter.route('/:id')
	.get(getUserById)
	.patch(validators.newUser, controllerLogger(updateUser))
	.delete(deleteUser);

userRouter.route('/addToGroup')
	.post(controllerLogger(addUsersToGroup));

export { userRouter };
