import express from 'express';
import { Request, Response, Router } from 'express';
import { createTask, showTasks, updateDescription, deleteTask } from './../controllers/taskController.js'

const router: Router = Router();

// get one task...???
router.get('/:tid')

// get all tasks per user
router.get('/user/:uid', showTasks, (req: Request, res: Response) => {
  res.status(201).json(res.locals.allTasks);
});

// create a task ~ user will be passed in w/ the body
router.post('/', createTask, (req: Request, res: Response) => {
  res.status(201).json(res.locals.newTask);
});

// update a specific task
router.patch('/:tid', updateDescription, (req: Request, res: Response) => {
  console.log(res.locals.updatedTasks);
  res.status(201).json(res.locals.updatedTasks);
})

// delete a task
router.delete('/user/:uid/:tid', deleteTask, (req: Request, res: Response) => {
  console.log(res.locals.updatedTasks);
  res.status(201).json(res.locals.updatedTasks);
})

export default router;