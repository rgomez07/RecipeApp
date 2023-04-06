import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { userRouter } from './routes/users.js';
import { recipesRouter } from './routes/recipes.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth', userRouter);
app.use('/recipes', recipesRouter);

dotenv.config({ path: './.env' });
mongoose.connect(process.env.MONGOOSEKEY);

app.listen(1738, () => console.log('Im like hey whats up hello!'));
