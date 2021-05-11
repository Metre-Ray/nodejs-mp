import express from "express";
import { createGroup, deleteGroup, getGroupById, getGroups, getUsersToGroupMap, updateGroup } from "../controllers/user-group-controller";
import { controllerLogger } from "../loggers/controller-logger";

const groupRouter = express.Router();

groupRouter.route('/')
	.post(controllerLogger(createGroup))
	.get(controllerLogger(getGroups));

groupRouter.route('/usersToGroupMap')
	.get(controllerLogger(getUsersToGroupMap));

groupRouter.route('/:id')
	.get(controllerLogger(getGroupById))
	.patch(controllerLogger(updateGroup))
	.delete(controllerLogger(deleteGroup));


export { groupRouter };
