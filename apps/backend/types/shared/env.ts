interface EnvKeyMappings {
  ADMIN_JWT_SECRET: string;
  API_TOKEN_SALT: string;
  TRANSFER_TOKEN_SALT: string;
  HOST: string;
  PORT: number;
  APP_KEYS: string[];
  WEBHOOKS_POPULATE_RELATIONS: boolean;
  // DATABASE
  DATABASE_CLIENT: "mysql" | "mysql2" | "postgres" | "sqlite";
  DATABASE_URL: string;
  DATABASE_HOST: string;
  DATABASE_PORT: number;
  DATABASE_NAME: string;
  DATABASE_USERNAME: string;
  DATABASE_PASSWORD: string;
  DATABASE_SSL: boolean;
  DATABASE_SSL_KEY: string;
  DATABASE_SSL_CERT: string;
  DATABASE_SSL_CA: string;
  DATABASE_SSL_CAPATH: string;
  DATABASE_SSL_CIPHER: string;
  DATABASE_SSL_REJECT_UNAUTHORIZED: boolean;
  DATABASE_POOL_MIN: number;
  DATABASE_POOL_MAX: number;
  DATABASE_SCHEMA: string;
  DATABASE_FILENAME: string;
  DATABASE_CONNECTION_TIMEOUT: number;
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
