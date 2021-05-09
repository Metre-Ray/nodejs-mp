import express from "express";
import { createGroup, deleteGroup, getGroupById, getGroups, getUsersToGroupMap, updateGroup } from "../controllers/user-group-controller";

const groupRouter = express.Router();

groupRouter.route('/')
	.post(createGroup)
	.get(getGroups);

groupRouter.route('/usersToGroupMap')
	.get(getUsersToGroupMap);

groupRouter.route('/:id')
	.get(getGroupById)
	.patch(updateGroup)
	.delete(deleteGroup);


export { groupRouter };
