import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { logException } from '../logger/file-logger.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? (() => {
            const res = exception.getResponse();
            if (typeof res === 'string') return res;
            if (typeof res === 'object' && res !== null) {
              const r = res as Record<string, unknown>;
              if (Array.isArray(r['message'])) return (r['message'] as string[]).join('; ');
              if (typeof r['message'] === 'string') return r['message'];
            }
            return exception.message;
          })()
        : exception instanceof Error
          ? exception.message
          : 'Internal server error';

    const stack =
      exception instanceof Error ? exception.stack : undefined;

    logException(request.method, request.url, statusCode, message, stack);

    response.status(statusCode).json({
      statusCode,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
