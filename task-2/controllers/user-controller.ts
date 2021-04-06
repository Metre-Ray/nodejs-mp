import USERS_ from '../data/users.json';
import { errorResponse } from '../helpers';
import { User } from '../interfaces/user';
import { passwordSchema, userCreateSchema, userUpdateSchema } from '../schemas/user.schema';
import { v4 as uuidv4 } from 'uuid';

const USERS = USERS_ as User[];

const createUser = (req, res) => {
    const user: User = req.body;

    const { error } = userCreateSchema.validate(user, {
        abortEarly: false,
        allowUnknown: false,
    });
    if (error?.isJoi) {
        res.status(400).json(errorResponse(error.details));
        return;
    }

    const passwordErrors = passwordSchema.validate(user.password, { list: true })
    if (passwordErrors.length) {
        res.status(400).json({ message: `password error: ${passwordErrors.join(', ')}` });
        return;
    }

    const oldUser = USERS.find(existingUser => existingUser.login === user.login);
    if (oldUser) {
        res.status(409).json({ message: 'User with such login already exists' });
        return;
    }

    const newUser = { ...user, id: uuidv4(), isDeleted: false };
    USERS.push(newUser);
    res.status(201).json(newUser);
}

const getUsers = (req, res) => {
    const { limit, loginSubstring = '' } = req.query;
    const numLimit = Number(limit);

    if (!numLimit || numLimit < 0) {
        res.status(400).json({ message: 'Query param "limit" must be a positive number' });
        return;
    }

    const result = USERS
        .filter(user => user.login.toLowerCase().includes(loginSubstring as string))
        .sort((user1, user2) => user1.login.localeCompare(user2.login, 'en'))
        .slice(0, Number(limit));
    res.json(result);
}

const getUserById = (req, res) => {
    const { id } = req.params;
    const user = USERS.find(existingUser => existingUser.id === id);

    if (!user) {
        res.status(404).json({ message: 'User not found' });
    } else {
        res.json(user);
    }
}

const updateUser = (req, res) => {
    const { id } = req.params;
    const userFields = req.body;
    const { error } = userUpdateSchema.validate(userFields, {
        abortEarly: false,
        allowUnknown: false,
    });
    if (error?.isJoi) {
        res.status(400).json(errorResponse(error.details));
        return;
    }

    if (userFields.password) {
        const passwordErrors = passwordSchema.validate(userFields.password, { list: true });
        if (passwordErrors.length) {
            res.status(400).json({ message: `password error: ${passwordErrors.join(', ')}` });
            return;
        }
    }

    const userIndex = USERS.findIndex(user => user.id === id);
    if (userIndex === -1) {
        res.status(404).json({ message: 'User not found' });
    } else {
        const newUser = { ...USERS[userIndex], ...userFields };
        USERS.splice(userIndex, 1, newUser);
        res.json(newUser);
    }
}

const deleteUser = (req, res) => {
    const { id } = req.params;
    const user = USERS.find(existingUser => existingUser.id === id);
    if (!user) {
        res.status(404).json({ message: 'User not found' });
    } else {
        user.isDeleted = true;
        res.json(user);
    }
}

export { createUser, getUsers, getUserById, updateUser, deleteUser };
