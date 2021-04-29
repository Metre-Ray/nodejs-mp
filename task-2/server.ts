import express from 'express';
import 'dotenv/config';
import process from 'process';
import { userRouter } from './routers/user-route';
import { initDBData } from './database/dbDataInit';

const PORT = process.env.PORT || 3456;

const app = express();

app.set('x-powered-by', false);
app.use(express.json());
app.use('/users', userRouter);


app.listen(PORT, async () => {
    await initDBData();
    return process.stdout.write(`server is listening on ${PORT}`);
});
