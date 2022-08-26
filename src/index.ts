import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { authenticate } from './middlewares/authenticate';
import { v1 } from './v1';
import { initializeApp } from 'firebase-admin';
// import { v2 } from './v2';

initializeApp();

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(authenticate());

app.use('/v1', v1);
// app.use('/v2', v2);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});