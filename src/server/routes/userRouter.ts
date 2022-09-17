import { Request, Response, Router } from 'express';
import { createUser, showUsers } from '../controllers/userController.js'

const router: Router = Router()

// /users


// show all users
router.get('/', showUsers, (req: Request, res: Response) => {
  res.status(201).json(res.locals.allUsers);
});

// create / signup user
router.post('/signup', createUser, (req: Request, res: Response) => {
  res.status(201).json(res.locals.newUser);
});

// login user
router.post('/login')



export default router;