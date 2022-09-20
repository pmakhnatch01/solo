import { NextFunction, Request, Response } from 'express';
import User from '../models/userModel.js';
import { UserInterface } from './../../types/userType';
import { Types } from 'mongoose';


// sign up
const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, password } = req.body as Pick<UserInterface, 'name' | 'email' | 'password'>;
    const createdUser : UserInterface = new User({
      name,
      email,
      password,
      tasks: [] as Types.ObjectId[]
    });
    await createdUser.save();
    res.locals.newUser = createdUser.toObject();
    next();
  } catch (err) {
    next(err);
  }
}

const showUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const allUsers: UserInterface[] = await User.find();
    res.locals.allUsers = allUsers;
    next();
  } catch (err) {
    next(err);
  }
}

const showUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body as Pick<UserInterface, 'email' | 'password'>;
    const user: any = await User.find({ email, password });
    console.log("userController -> showUser -> user", user);
    if (!user) {
      res.locals.user = 'user_not_found'
    } else {
      res.locals.user = user;
      next();
    }
  } catch (err) {
    next(err);
  }
}

export { createUser, showUsers, showUser };