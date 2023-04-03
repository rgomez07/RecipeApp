import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/User.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if (user) {
    return res.json({ message: 'Username taken, please choose another!' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({
    username,
    password: hashedPassword,
  });
  await newUser.save();
  res.json({ message: 'You have registered successfully!' });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if (!user) {
    return res.json({ message: 'User does not exist!' });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.json({ message: 'Incorrect Username or Password!' });
  }

  const token = jwt.sign({ id: user._id }, 'secret');
  res.json({ token, userID: user._id });
});

export { router as userRouter };
