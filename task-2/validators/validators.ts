import { Request, Response } from 'express';
import { errorResponse } from '../helpers';
import { IUser } from '../models/user.interface';
import { passwordSchema, userCreateSchema, userUpdateSchema } from '../joi-schemas/user.schema';


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
}
