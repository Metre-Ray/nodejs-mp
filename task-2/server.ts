import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import 'dotenv/config';
import { User } from './interfaces/user';
import { userCreateSchema, userUpdateSchema, passwordSchema } from './schemas/user.schema';
import { errorResponse } from './helpers';
import USERS from './data/users.json';

const PORT = process.env.PORT;

const app = express();
const userRouter = express.Router();

app.set('x-powered-by', false);
app.use(express.json());
app.use('/users', userRouter);


userRouter.route('/')
	.post((req, res) => {
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
			res.status(404).json({ message: 'User with such login already exists' });
			return;
		}

		const newUser = { ...user, id: uuidv4(), isDeleted: false };
		USERS.push(newUser);
		res.status(200).send(newUser);
	})
	.get((req, res) => {
		const { limit, loginSubstring = '' } = req.query;
		const numLimit = Number(limit);

		if (!numLimit || numLimit < 0) {
			res.status(404).json({ message: 'Query param "limit" must be a positive number' });
			return;
		}

		const result = USERS
			.filter(user => user.login.toLowerCase().includes(loginSubstring as string))
			.sort((user1, user2) => user1.login.localeCompare(user2.login, 'en'))
			.slice(0, Number(limit));
		res.json(result);
	});

userRouter.route('/:id')
	.get((req, res) => {
		const { id } = req.params;
		const user = USERS.find(existingUser => existingUser.id === id);

		if (!user) {
			res.status(404).json({ message: 'User not found' });
		} else {
			res.json(user);
		}
	})
	.patch((req, res) => {
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
	})
	.delete((req, res) => {
		const { id } = req.params;
		const user = USERS.find(existingUser => existingUser.id === id);
		if (!user) {
			res.status(404).json({ message: 'User not found' });
		} else {
			user.isDeleted = true;
			res.json(user);
		}
	});


app.listen(PORT, () => {
	// tslint:disable-next-line:no-console
    return console.log(`server is listening on ${PORT}`);
});
