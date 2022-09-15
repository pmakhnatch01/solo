import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
console.log('process env ', process.env.PORT);

const port: string | undefined = process.env.PORT;

// console.log("server.js is running", process.env);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  return next();
});

console.log(process.env.ENV);

const DB: string | undefined =
  process.env.DATABASE_PASSWORD === undefined
    ? undefined
    : process.env.DATABASE?.replace(
        '<PASSWORD>',
        process.env.DATABASE_PASSWORD
      );

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then((): void => console.log('DB connection successful!'))
  .catch((err) => {
    console.log(err);
  });

console.log('HAHA');

app.get('/', (req: Request, res: Response): void => {
  res.send('Express + TypeScript Server');
});

app.get('/test', (req: Request, res: Response): void => {
  console.log('AEHHFAHFAHF');
  res.json({ key: 'value test string' });
});

app.listen(port, (): void => {
  console.log(
    `⚡️[server]: Server is running at https://localhost:${port ?? 'something'}`
  );
});
