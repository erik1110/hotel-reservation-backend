import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiResponse,
  ApiResponseOptions,
  getSchemaPath,
} from '@nestjs/swagger';
import { ErrorDTO } from 'src/common/dto/error.dto';
export function ApiErrorDecorator(
  statusCode: HttpStatus,
  name: string,
  message?: string,
  options?: ApiResponseOptions,
) {
  return applyDecorators(
    ApiResponse({
      ...options,
      status: statusCode,
      description: name,
      schema: {
        default: {
          status: false,
          name: name,
          message: message,
        },
        type: getSchemaPath(ErrorDTO),
      },
    }),
  );
}
