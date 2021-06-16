import express from 'express';
import 'dotenv/config';
import process from 'process';
import { userRouter } from './routers/user-route';
import { initDBData } from './database/dbDataInit';
import { groupRouter } from './routers/group-route';
import morgan from 'morgan';
import { logger } from './loggers/loggers';
import { authRouter } from './routers/auth-route';
import { validators } from './validators/validators';
import cors from 'cors';

const PORT = process.env.PORT || 3456;

const app = express();

app.set('x-powered-by', false);
app.use(cors())
app.use(express.json());
app.use(morgan('tiny', { stream: { write: message => logger.info(message) } }));

app.use('/users', validators.checkToken, userRouter);
app.use('/groups', validators.checkToken, groupRouter);
app.use('/auth', authRouter);

// Error handler 1: Express Error middleware
app.use((err, req, res, next) => {
    logger.error(err, { exceptionType: 'Error from middleware' });
    res.status(500).send({ error: `${err.name} ${err.message}` });
});

app.listen(PORT, async () => {
    await initDBData();
    return process.stdout.write(`server is listening on ${PORT}`);
});

// Error handler 2: Node's uncaughtException handler for unhandled error inside callback of some function called from route handler
process.on('uncaughtException', (err: any) => {
    logger.error(err, { exceptionType: 'Uncaught Exception' });
});

// Error handler 3: handler for unhandled promise rejection
process.on('unhandledRejection', (err: any) => {
    logger.error(err, { exceptionType: 'Unhandled Rejection' });
});
