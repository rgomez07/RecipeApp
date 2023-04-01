import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config({ path: './.env' });
mongoose.connect(process.env.MONGOOSEKEY);

app.listen(1738, () => console.log('Im like hey whats up hello!'));
