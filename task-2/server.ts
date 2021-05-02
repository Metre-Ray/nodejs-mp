import express from 'express';
import 'dotenv/config';
import process from 'process';
import { userRouter } from './routers/user-route';
import { initDBData } from './database/dbDataInit';
import { groupRouter } from './routers/group-route';

const PORT = process.env.PORT || 3456;

const app = express();

app.set('x-powered-by', false);
app.use(express.json());
app.use('/users', userRouter);
app.use('/groups', groupRouter);

app.listen(PORT, async () => {
    await initDBData();
    return process.stdout.write(`server is listening on ${PORT}`);
});
