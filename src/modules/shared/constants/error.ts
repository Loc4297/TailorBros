import { HttpException, HttpStatus } from '@nestjs/common';

export const INTERNAL_SERVER_ERROR = new HttpException(
  {
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    error: 'INTERNAL SERVER ERROR (*)',
  },
  HttpStatus.INTERNAL_SERVER_ERROR,
);
