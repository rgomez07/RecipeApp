import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('a');

app.listen(1738, () => console.log('Im like hey whats up hello!'));
