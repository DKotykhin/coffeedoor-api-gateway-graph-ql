import { IsNotEmpty, validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { Logger } from '@nestjs/common';

const logger = new Logger('env.validator.ts');

class EnvironmentVariables {
  @IsNotEmpty()
  HTTP_PORT: string;

  @IsNotEmpty()
  MENU_SERVICE_HOST: string;

  @IsNotEmpty()
  MENU_SERVICE_PORT: string;

  @IsNotEmpty()
  STORE_SERVICE_HOST: string;

  @IsNotEmpty()
  STORE_SERVICE_PORT: string;

  @IsNotEmpty()
  USER_SERVICE_HOST: string;

  @IsNotEmpty()
  USER_SERVICE_PORT: string;

  @IsNotEmpty()
  ORDER_SERVICE_HOST: string;

  @IsNotEmpty()
  ORDER_SERVICE_PORT: string;

  @IsNotEmpty()
  AWS_ACCESS_KEY_ID: string;

  @IsNotEmpty()
  AWS_SECRET_ACCESS_KEY: string;

  @IsNotEmpty()
  AWS_REGION: string;

  @IsNotEmpty()
  AWS_BUCKET_NAME: string;

  @IsNotEmpty()
  JWT_SECRET_KEY: string;

  @IsNotEmpty()
  JWT_EXPIRES_IN: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    logger.error(errors.toString(), {
      ...errors.map(
        (error) =>
          `${Object.values(error.constraints)} | value: ${error.value}`,
      ),
    });
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
