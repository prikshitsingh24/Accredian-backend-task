import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import referralRouter from './routes/referral';
import courseRouter from './routes/course';
import cors from 'cors'; 
const app = express();
const port = 3000;
dotenv.config();
app.use(cors({
  origin: ["https://accredian-frontend-ch5lgfuvf-prikshit-singhs-projects.vercel.app/"],
  methods: ['GET', 'POST']
}));
app.use(express.json());
app.use('/api/referral',referralRouter)
app.use('/api/course',courseRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello,This is Accerdian backend');
});


app.listen(port, () => {
  console.log(`Server running on ${process.env.APP_URL}`);
});