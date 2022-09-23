import { NextFunction, Request, Response } from 'express';
import User from '../models/userModel.js';
import { UserInterface } from './../../types/userType';
import { Types } from 'mongoose';
import bcrypt from 'bcrypt';


// sign up
const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, password } = req.body as Pick<UserInterface, 'name' | 'email' | 'password'>;
    console.log("createUser#1")
    const salt: any = await bcrypt.genSalt();
    const passwordHashed: any = await bcrypt.hash(password, salt);
    console.log("createUser#1.5", passwordHashed, typeof passwordHashed)
    const createdUser : UserInterface = new User({
      name,
      email,
      passwordHashed,
      tasks: [] as Types.ObjectId[]
    });
    console.log("createUser#2")
    await createdUser.save();
    console.log("createUser#3", createdUser);
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
    const user: any = await User.findOne({ email });
    const passwordCorrect = await bcrypt.compare(
      password,
      user.passwordHashed
    );
    console.log("userController -> showUser", user);
    if (!passwordCorrect) {
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