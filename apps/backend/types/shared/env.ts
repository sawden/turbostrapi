interface EnvKeyMappings {
  BACKEND_ADMIN_JWT_SECRET: string;
  BACKEND_JWT_SECRET: string;
  BACKEND_API_TOKEN_SALT: string;
  BACKEND_TRANSFER_TOKEN_SALT: string;
  BACKEND_HOST: string;
  BACKEND_PORT: number;
  BACKEND_APP_KEYS: string[];
  BACKEND_WEBHOOKS_POPULATE_RELATIONS: boolean;
  // DATABASE
  BACKEND_DATABASE_CLIENT: "mysql" | "mysql2" | "postgres" | "sqlite";
  BACKEND_DATABASE_URL: string;
  BACKEND_DATABASE_HOST: string;
  BACKEND_DATABASE_PORT: number;
  BACKEND_DATABASE_NAME: string;
  BACKEND_DATABASE_USERNAME: string;
  BACKEND_DATABASE_PASSWORD: string;
  BACKEND_DATABASE_SSL: boolean;
  BACKEND_DATABASE_SSL_KEY: string;
  BACKEND_DATABASE_SSL_CERT: string;
  BACKEND_DATABASE_SSL_CA: string;
  BACKEND_DATABASE_SSL_CAPATH: string;
  BACKEND_DATABASE_SSL_CIPHER: string;
  BACKEND_DATABASE_SSL_REJECT_UNAUTHORIZED: boolean;
  BACKEND_DATABASE_POOL_MIN: number;
  BACKEND_DATABASE_POOL_MAX: number;
  BACKEND_DATABASE_SCHEMA: string;
  BACKEND_DATABASE_FILENAME: string;
  BACKEND_DATABASE_CONNECTION_TIMEOUT: number;
}

type EnvNumberKeys = {
  [K in keyof EnvKeyMappings]: EnvKeyMappings[K] extends number ? K : never;
}[keyof EnvKeyMappings];

type EnvArrayKeys = {
  [K in keyof EnvKeyMappings]: EnvKeyMappings[K] extends (
    | string
    | number
    | boolean
  )[]
    ? K
    : never;
}[keyof EnvKeyMappings];

type EnvBooleanKeys = {
  [K in keyof EnvKeyMappings]: EnvKeyMappings[K] extends boolean ? K : never;
}[keyof EnvKeyMappings];

export interface EnvFunction {
  <K extends keyof EnvKeyMappings>(key: K): EnvKeyMappings[K] | undefined;
  <K extends keyof EnvKeyMappings>(
    key: K,
    defaultValue: EnvKeyMappings[K],
  ): EnvKeyMappings[K];
  <K extends keyof EnvKeyMappings>(
    key: K,
    defaultValue: undefined,
  ): EnvKeyMappings[K] | undefined;

  int<K extends EnvNumberKeys>(key: K, defaultValue: number): number;
  int<K extends EnvNumberKeys>(
    key: K,
    defaultValue?: undefined,
  ): number | undefined;

  array<K extends EnvArrayKeys>(key: K, defaultValue: string[]): string[];
  array<K extends EnvArrayKeys>(
    key: K,
    defaultValue?: undefined,
  ): string[] | undefined;

  bool<K extends EnvBooleanKeys>(key: K, defaultValue: boolean): boolean;
  bool<K extends EnvBooleanKeys>(
    key: K,
    defaultValue?: undefined,
  ): boolean | undefined;
}
