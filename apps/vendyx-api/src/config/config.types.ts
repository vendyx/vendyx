import { CipherGCMTypes } from 'node:crypto';

export type Environment = {
  PORT: number;
  ADMIN: {
    DOMAIN: string;
  };
  DATABASE: {
    URL: string;
  };
  JWT: {
    SECRET: string;
    EXPIRES_IN: string;
  };
  CLOUDINARY: {
    CLOUD_NAME: string;
    API_KEY: string;
    API_SECRET: string;
  };
  SENDGRID: {
    API_KEY: string;
  };
  SECURITY: {
    ENCRYPT_ALGORITHM: CipherGCMTypes;
    ENCRYPT_PASSWORD: string;
  };
};

// Needed for typed ConfigService
export type Leaves<T> = T extends object
  ? {
      [K in keyof T]: `${Exclude<K, symbol>}${Leaves<T[K]> extends never
        ? ''
        : `.${Leaves<T[K]>}`}`;
    }[keyof T]
  : never;

export type LeafTypes<T, S extends string> = S extends `${infer T1}.${infer T2}`
  ? T1 extends keyof T
    ? LeafTypes<T[T1], T2>
    : never
  : S extends keyof T
  ? T[S]
  : never;
