import { plainToClass } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsNumber()
  PORT: number;

  @IsString()
  @IsNotEmpty()
  VENDYX_ADMIN_DOMAIN: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_URL: string;

  @IsString()
  @IsNotEmpty()
  JWT_SECRET: string;

  @IsString()
  @IsNotEmpty()
  JWT_EXPIRES_IN: string;

  @IsString()
  @IsNotEmpty()
  CLOUDINARY_CLOUD_NAME: string;

  @IsString()
  @IsNotEmpty()
  CLOUDINARY_API_KEY: string;

  @IsString()
  @IsNotEmpty()
  CLOUDINARY_API_SECRET: string;

  @IsString()
  @IsNotEmpty()
  SENDGRID_API_KEY: string;

  @IsString()
  @IsNotEmpty()
  ENCRYPT_ALGORITHM: string;

  @IsString()
  @IsNotEmpty()
  ENCRYPT_PASSWORD: string;
}

export const environmentValidator = (config: Record<string, unknown>) => {
  const configClass = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true
  });

  const errors = validateSync(configClass, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(`Configuration validation failed: ${errors.toString()}`);
  }

  return configClass;
};
