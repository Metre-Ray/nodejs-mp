import express from "express";
import { createUser, deleteUser, getUserById, getUsers, updateUser } from "../controllers/user-controller";
import { addUsersToGroup } from "../controllers/user-group-controller";
import { validators } from "../validators/validators";

const userRouter = express.Router();

userRouter.route('/')
	.post(validators.newUser, createUser)
	.get(validators.getUserQuery, getUsers);

userRouter.route('/:id')
	.get(getUserById)
	.patch(validators.newUser, updateUser)
	.delete(deleteUser);

userRouter.route('/addToGroup')
	.post(addUsersToGroup);

export { userRouter };
