import { Request, Response, NextFunction } from 'express';
import * as authService from './auth.service';

export const getAuthData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Interacting with the service layer
    // const data = await authService.fetchData();
    return res.status(200).json({ success: true, message: 'Hello from Auth Controller' });
  } catch (error) {
    next(error);
  }
};
