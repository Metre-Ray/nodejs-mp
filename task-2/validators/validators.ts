import { Request, Response } from 'express';
import { errorResponse } from '../helpers';
import { IUser } from '../models/user.interface';
import { passwordSchema, userCreateSchema, userUpdateSchema } from '../joi-schemas/user.schema';
import * as jwt from 'jsonwebtoken';


export const validators = {
    newUser: (req: Request, res: Response, next: Function) => {
        const user: IUser = req.body;

        const validationSchema = req.method === 'PATCH' ? userUpdateSchema : userCreateSchema;
        const { error } = validationSchema.validate(user, {
            abortEarly: false,
            allowUnknown: false,
        });
        if (error?.isJoi) {
            res.status(400).json(errorResponse(error.details));
            return;
        }

        if (req.method === 'POST' || (req.method === 'PATCH' && user.password)) {
            const passwordErrors = passwordSchema.validate(user.password, { list: true })
            if (passwordErrors.length) {
                res.status(400).json({ message: `password error: ${passwordErrors.join(', ')}` });
                return;
            }
        }
        next();
    },
    getUserQuery: (req: Request, res: Response, next: Function) => {
        const { limit } = req.query;
        const numLimit = Number(limit);

        if (!numLimit || numLimit < 0) {
            res.status(400).json({ message: 'Query param "limit" must be a positive number' });
            return;
        }
        next();
    },
    checkToken: (req: Request, res: Response, next: Function) => {
        const bearerHeader = req.headers.authorization;
        if (bearerHeader) {
            const token = bearerHeader.split(' ')[1];
            const secret = process.env.JWT_SECRET;
            jwt.verify(token, secret, (err) => {
                if (err) {
                    res.status(403).json({ message: 'Failed to verify token' });
                } else {
                    next();
                }
            });
        } else {
            res.status(401).json({ message: 'No token provided' });
        }
    }
}
