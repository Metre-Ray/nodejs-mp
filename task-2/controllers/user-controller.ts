
import { IUser } from '../models/user.interface';
import { Request, Response } from 'express';
import { UserService } from '../services/user.service';


const createUser = async (req: Request, res: Response) => {
    const user: IUser = req.body;

    const oldUser = await UserService.getUser({ login: user.login });
    if (oldUser) {
        res.status(409).json({ message: 'User with such login already exists' });
        return;
    }

    const newUser = await UserService.createUser(user);
    res.status(201).json(newUser);
}

const getUsers = async (req: Request, res: Response) => {
    const { limit, loginSubstring = '' } = req.query;
    const numLimit = Number(limit);
    const users = await UserService.getUsersWithLogin(loginSubstring as string, numLimit);
    res.json(users);
}

const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await UserService.getUser({ id });
    if (!user) {
        res.status(404).json({ message: 'User not found' });
    } else {
        res.json(user);
    }
}

const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userFields = req.body;

    const newUser = await UserService.updateUser(id, { ...userFields });
    if (!newUser) {
        res.status(404).json({ message: 'User not found' });
    } else {
        res.json(newUser);
    }
}

const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const newUser = await UserService.updateUser(id, { isDeleted: true });
    if (!newUser) {
        res.status(404).json({ message: 'User not found' });
    } else {
        res.json(newUser);
    }
}

const authenticateUser = async (req: Request, res: Response) => {
    const { login, password } = req.body;
    const token = await UserService.login(login, password);
    if (!token) {
        res.status(403).json({ message: 'Bad login/password combination' });
        return;
    }
    res.send(token);
}

export { createUser, getUsers, getUserById, updateUser, deleteUser, authenticateUser };
