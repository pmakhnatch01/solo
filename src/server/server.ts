import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port: string | undefined = process.env.PORT;

// console.log("server.js is running", process.env);
console.log('test');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

console.log('haha');

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.get('/test', (req: Request, res: Response) => {
  console.log('AEHHFAHFAHF');
  res.json({ key: 'value test string' });
});

app.listen(port, (): void => {
  console.log(
    `⚡️[server]: Server is running at https://localhost:${port ?? 'something'}`
  );
});
