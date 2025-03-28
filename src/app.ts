import express from 'express';
import cors from 'cors';

import { connectDB } from './config/db/connect';
import userRouter from './routes/userRoute';

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api', userRouter);

export { app };