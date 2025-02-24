import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import referralRouter from './routes/referral';
import courseRouter from './routes/course';
const app = express();
const port = 3000;
dotenv.config();

app.use(express.json());
app.use(bodyParser.json());
app.use('/api/referral',referralRouter)
app.use('/api/course',courseRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello,This is Accerdian backend');
});


app.listen(port, () => {
  console.log(`Server running on ${process.env.APP_URL}`);
});