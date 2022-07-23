import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

import * as fs from 'fs';
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log('EX CALL !!!');
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const errorResponse = {
      code: status,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      body: request.body,
      path: request.url,
      method: request.method,
      message: exception.message,
    };
    const errorLog = `Response Code ${errorResponse.code} - URL: ${errorResponse.path} -  Method: ${errorResponse.method} - Message: ${errorResponse.message} \n \n`;
    this.writeLogToFile(errorLog);
    response.status(status).json(errorResponse);
  }

  writeLogToFile = (errorLog: string) => {
    fs.appendFile('error.log', errorLog, 'utf-8', (err) => {
      if (err) throw err;
    });
  };
}
