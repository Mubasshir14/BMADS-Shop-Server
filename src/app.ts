import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import cookieParser from 'cookie-parser';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['https://bmads-client.vercel.app', 'http://localhost:3000'],
    credentials: true,
  }),
);

// application route
app.use('/api/v1', router);

const getAController = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Running 🏃‍♂️🏃‍♂️🏃🏃',
  });
};

app.get('/', getAController);

export default app;
