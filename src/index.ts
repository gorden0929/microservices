import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { authenticate } from './middlewares/authenticate';
import { v1 } from './v1';
// import { v2 } from './v2';

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(authenticate());

app.use('/v1', v1);
// app.use('/v2', v2);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});