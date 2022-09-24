import { NextFunction, Request, Response } from 'express';
import Task from '../models/taskModel.js';
import User from '../models/userModel.js';
import { TaskInterface } from './../../types/taskType';
import { Types, ObjectId } from 'mongoose';

const createTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { time, description, type, user } = req.body as Pick<TaskInterface, 'time' | 'description' | 'type' | 'user' >;
    console.log(new Date(time));

    const createdTask = new Task({
      time,
      description,
      type,
      user
    });
    await createdTask.save();
    const updatedTasks = await Task.find({ user });
    // console.log("taskController -> createTask -> updatedTasks", updatedTasks)
    const findUser = await User.findOne({ _id: user });
    // console.log("taskController -> createTask -> user", findUser);
    const userDocument = await User.findOneAndUpdate({ _id: user }, { tasks: updatedTasks }, { new: true });
    // await userDocument.save();
    // console.log("taskController -> createTask -> userDocument", userDocument);
    res.locals.newTask = updatedTasks;
    next();
  } catch (err) {
    return next(err);
  }
}

// show all tasks
const showTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.params.uid;
    const allUserTasks: TaskInterface[] = await Task.find({ user: userId });
    const name:any = await User.findOne({ user: userId });
    res.locals.allUserTasks = allUserTasks;
    res.locals.name = name.name;
    next();
  } catch (err) {
    return next(err);
  }
}

// update a task ~ sends back
const updateDescription = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const taskId = req.params.tid;
    const { description, user } = req.body as Pick<TaskInterface, 'description' | 'user'>;
    const updatedTask = await Task.findOneAndUpdate({ _id: taskId }, { description }, { new: true });
    const updatedTasks = await Task.find({ user });
    res.locals.updatedTasks = updatedTasks;
    return next();
  } catch (err) {
    return next(err);
  }
}

// delete a task
const deleteTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const taskId = req.params.tid;
    const userId = req.params.uid;
    await Task.findOneAndDelete({ _id: taskId });
    const updatedTasks = await Task.find({ user:userId });
    res.locals.updatedTasks = updatedTasks;
    return next();
  } catch (err) {
    return next(err);
  }
}

export { createTask, showTasks, updateDescription, deleteTask };