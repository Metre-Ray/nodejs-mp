import express from "express";
import { createUser, deleteUser, getUserById, getUsers, updateUser } from "../controllers/user-controller";

const userRouter = express.Router();

userRouter.route('/')
	.post(createUser)
	.get(getUsers);

userRouter.route('/:id')
	.get(getUserById)
	.patch(updateUser)
	.delete(deleteUser);

export { userRouter };
