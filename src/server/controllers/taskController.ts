import { NextFunction, Request, Response } from 'express';
import Task from '../models/taskModel.js';
import User from '../models/userModel.js';
import { TaskInterface } from './../../types/taskType';
import { Types, ObjectId } from 'mongoose';

const createTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { time, description, type, user } = req.body as Pick<TaskInterface, 'time' | 'description' | 'type' | 'user' >;
    const createdTask = new Task({
      time,
      description,
      type,
      user: user
    });
    await createdTask.save();
    const updatedTasks = await Task.find();
    res.locals.newTask = updatedTasks;
    next();
  } catch (err) {
    return next(err);
  }
}

// show all tasks
const showTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const allTasks: TaskInterface[] = await Task.find();
    res.locals.allTasks = allTasks;
    next();
  } catch (err) {
    return next(err);
  }
}

// update a task ~ sends back
const updateDescription = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const taskId = req.params.tid;
    const { description } = req.body as Pick<TaskInterface, 'description'>;
    const updatedTask = await Task.findOneAndUpdate({ _id: taskId }, { description: description }, { new: true });
    const updatedTasks = await Task.find();
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
    const updatedTasks = await Task.find();
    res.locals.updatedTasks = updatedTasks;
    return next();
  } catch (err) {
    return next(err);
  }
}

export { createTask, showTasks, updateDescription, deleteTask };