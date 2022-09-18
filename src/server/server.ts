import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/userRouter.js'
import taskRouter from './routes/taskRouter.js'

dotenv.config();

// create an express application and add json parser
const app: Express = express();
app.use(express.json());

// CORS handler
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  return next();
});

// const DB: string | undefined = process.env.DATABASE;
// const options: { useNewUrlParser: boolean, useCreateIndex: boolean, useFindAndModify: boolean } = { useNewUrlParser: true,  useCreateIndex: true, useFindAndModify: true };
// const username: string = process.env.USERNAME !== undefined ? process.env.USERNAME : '';
// const password: string = process.env.DATABASE_PASSWORD !== undefined ? process.env.DATABASE_PASSWORD : '';
// const DB: string = process.env.DATABASE !== undefined ? process.env.DATABASE.replace('<username>', username).replace('<password>', password) : '';

// CONNECT TO THE DATABASE
const uri: string = `mongodb+srv://${process.env.USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.fytg8r6.mongodb.net/?retryWrites=true&w=majority`
const port: string = process.env.PORT !== undefined ? process.env.PORT : '';
mongoose
  .connect(uri)
  .then((): void => console.log('DB connection successful!'))
  .catch((err) => {
    console.log("mongoose connect error: ", err);
  });

// user routes
app.use('/users', userRouter);

// task routes
app.use('/tasks', taskRouter);


// testing for frontend
app.get('/', (req: Request, res: Response): void => {
  res.send('Express + TypeScript Server');
});
app.get('/test', (req: Request, res: Response): void => {
  res.json({ key: 'value test string' });
});

// GLOBAL ERROR MIDDLEWARE

// start up a node/express server
app.listen(port, (): void => {
  console.log(
    `⚡️[server]: Server is running at https://localhost:${port ?? 'something'}`
  );
});
