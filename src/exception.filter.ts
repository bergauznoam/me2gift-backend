import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpStatus
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus ? exception.getStatus() : HttpStatus.BAD_REQUEST;
        const message = exception.response?.message || exception.message || exception;

        response
            .status(status)
            .json({
                code: status,
                message
            });
    }
}