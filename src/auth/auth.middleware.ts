import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';

export async function Authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  let token: string = req.headers.authorization;
  //   let result = await AuthService.auth(token);

  //   if (result) {
  //     next();
  //   } else {
  //     throw new Error('Have Error');
  //   }
}
