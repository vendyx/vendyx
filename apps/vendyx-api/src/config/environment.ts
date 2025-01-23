import { CipherGCMTypes } from 'node:crypto';

import { Environment } from './config.types';

export const loadEnvironment = (): Environment => ({
  PORT: parseInt(process.env.PORT ?? '') || 3000,
  ADMIN: {
    DOMAIN: process.env.VENDYX_ADMIN_DOMAIN ?? ''
  },
  DATABASE: {
    URL: process.env.DATABASE_URL ?? ''
  },
  JWT: {
    SECRET: process.env.JWT_SECRET ?? '',
    EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? ''
  },
  CLOUDINARY: {
    CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME ?? '',
    API_KEY: process.env.CLOUDINARY_API_KEY ?? '',
    API_SECRET: process.env.CLOUDINARY_API_SECRET ?? ''
  },
  SENDGRID: {
    API_KEY: process.env.SENDGRID_API_KEY ?? ''
  },
  SECURITY: {
    ENCRYPT_ALGORITHM: process.env.ENCRYPT_ALGORITHM as CipherGCMTypes,
    ENCRYPT_PASSWORD: process.env.ENCRYPT_PASSWORD ?? ''
  }
});
