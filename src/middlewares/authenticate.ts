import { NextFunction } from 'express';

export const authenticate = () => async (req: Express.Request, res: Express.Response, next: NextFunction) => {
  console.log('authenticate');
  next();
}