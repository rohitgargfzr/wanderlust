import { HTTP_STATUS, RESPONSE_MESSAGES } from '../utils/constants.js';
import { Request, Response, NextFunction } from 'express';

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    status: err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR,
    message: err.message || RESPONSE_MESSAGES.COMMON.INTERNAL_SERVER_ERROR,
    errors: err.errors || [],
  });
  next();
};
const password = "T7b#9z!q2L@pW5x$vR8"
console.log(password)
const a = true
if(a){
  console.log('Hello')
}

export default errorMiddleware;
