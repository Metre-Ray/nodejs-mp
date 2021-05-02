import { Request, Response } from 'express';
import { UserGroupService } from '../services/user-group.service';
import { UserGroupType } from '../models/user-group.interface';
import { UserService } from '../services/user.service';


const createGroup = async (req: Request, res: Response) => {
    const group: UserGroupType = req.body;

    const oldGroup = await UserGroupService.getGroup({ name: group.name });
    if (oldGroup) {
        res.status(409).json({ message: 'User with such login already exists' });
        return;
    }

    const newGroup = await UserGroupService.createGroup(group);
    res.status(201).json(newGroup);
}

const getGroups = async (req: Request, res: Response) => {
    const users = await UserGroupService.getGroups({});
    res.json(users);
}

const getGroupById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const group = await UserGroupService.getGroup({ id });
    if (!group) {
        res.status(404).json({ message: 'Group not found' });
    } else {
        res.json(group);
    }
}

const updateGroup = async (req: Request, res: Response) => {
    const { id } = req.params;
    const groupFields = req.body;

    const newGroup = await UserGroupService.updateGroup(id, { ...groupFields });
    if (!newGroup) {
        res.status(404).json({ message: 'User not found' });
    } else {
        res.json(newGroup);
    }
}

const deleteGroup = async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedGroup = await UserGroupService.deleteGroup(id);
    if (!deletedGroup) {
        res.status(404).json({ message: 'Group not found' });
    } else {
        res.json(deletedGroup);
    }
}

const addUsersToGroup = async (req: Request, res: Response) => {
    const { groupId, usersIds } = req.body;
    const map = await UserService.addUsersToGroup(groupId, usersIds);
    if (!map) {
        res.status(404).json({ message: 'Either group or users not found' });
    } else {
        res.json(map);
    }
}

const getUsersToGroupMap = async (req: Request, res: Response) => {
    const map = await UserGroupService.getUsersToGroupMap();
    res.json(map);
}

export { createGroup, getGroups, getGroupById, updateGroup, deleteGroup, addUsersToGroup, getUsersToGroupMap };
