import { NextFunction } from 'express';
import * as admin from 'firebase-admin'

export const authenticate = () => async (req: Express.Request, res: Express.Response, next: NextFunction) => {
  console.log('authenticate');
  await admin.firestore().collection('test').get();
  next();
}