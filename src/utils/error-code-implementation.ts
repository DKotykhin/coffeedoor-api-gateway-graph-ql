import { HttpStatus } from '@nestjs/common';

export const errorCodeImplementation = (code: number | string): number => {
  let httpCode = 500;
  switch (+code) {
    case 1:
      httpCode = HttpStatus.UNPROCESSABLE_ENTITY;
      break;
    case 3:
      httpCode = HttpStatus.BAD_REQUEST;
      break;
    case 4:
      httpCode = HttpStatus.GATEWAY_TIMEOUT;
      break;
    case 5:
      httpCode = HttpStatus.NOT_FOUND;
      break;
    case 6:
      httpCode = HttpStatus.CONFLICT;
      break;
    case 7:
      httpCode = HttpStatus.FORBIDDEN;
      break;
    case 13:
      httpCode = HttpStatus.INTERNAL_SERVER_ERROR;
      break;
    case 14:
      httpCode = HttpStatus.SERVICE_UNAVAILABLE;
      break;
    case 16:
      httpCode = HttpStatus.UNAUTHORIZED;
      break;
    default:
      httpCode = HttpStatus.INTERNAL_SERVER_ERROR;
  }
  return httpCode;
};
