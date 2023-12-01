import path from "path";

import type { EnvFunction } from "../types/shared/env";

export default ({ env }: { env: EnvFunction }) => {
  const client = env("BACKEND_DATABASE_CLIENT", "sqlite");

  const connections = {
    mysql: {
      connection: {
        connectionString: env("BACKEND_DATABASE_URL"),
        host: env("BACKEND_DATABASE_HOST", "localhost"),
        port: env.int("BACKEND_DATABASE_PORT", 3306),
        database: env("BACKEND_DATABASE_NAME", "strapi"),
        user: env("BACKEND_DATABASE_USERNAME", "strapi"),
        password: env("BACKEND_DATABASE_PASSWORD", "strapi"),
        ssl: env.bool("BACKEND_DATABASE_SSL", false) && {
          key: env("BACKEND_DATABASE_SSL_KEY", undefined),
          cert: env("BACKEND_DATABASE_SSL_CERT", undefined),
          ca: env("BACKEND_DATABASE_SSL_CA", undefined),
          capath: env("BACKEND_DATABASE_SSL_CAPATH", undefined),
          cipher: env("BACKEND_DATABASE_SSL_CIPHER", undefined),
          rejectUnauthorized: env.bool(
            "BACKEND_DATABASE_SSL_REJECT_UNAUTHORIZED",
            true,
          ),
        },
      },
      pool: {
        min: env.int("BACKEND_DATABASE_POOL_MIN", 2),
        max: env.int("BACKEND_DATABASE_POOL_MAX", 10),
      },
    },
    mysql2: {
      connection: {
        host: env("BACKEND_DATABASE_HOST", "localhost"),
        port: env.int("BACKEND_DATABASE_PORT", 3306),
        database: env("BACKEND_DATABASE_NAME", "strapi"),
        user: env("BACKEND_DATABASE_USERNAME", "strapi"),
        password: env("BACKEND_DATABASE_PASSWORD", "strapi"),
        ssl: env.bool("BACKEND_DATABASE_SSL", false) && {
          key: env("BACKEND_DATABASE_SSL_KEY", undefined),
          cert: env("BACKEND_DATABASE_SSL_CERT", undefined),
          ca: env("BACKEND_DATABASE_SSL_CA", undefined),
          capath: env("BACKEND_DATABASE_SSL_CAPATH", undefined),
          cipher: env("BACKEND_DATABASE_SSL_CIPHER", undefined),
          rejectUnauthorized: env.bool(
            "BACKEND_DATABASE_SSL_REJECT_UNAUTHORIZED",
            true,
          ),
        },
      },
      pool: {
        min: env.int("BACKEND_DATABASE_POOL_MIN", 2),
        max: env.int("BACKEND_DATABASE_POOL_MAX", 10),
      },
    },
    postgres: {
      connection: {
        connectionString: env("BACKEND_DATABASE_URL"),
        host: env("BACKEND_DATABASE_HOST", "localhost"),
        port: env.int("BACKEND_DATABASE_PORT", 5432),
        database: env("BACKEND_DATABASE_NAME", "strapi"),
        user: env("BACKEND_DATABASE_USERNAME", "strapi"),
        password: env("BACKEND_DATABASE_PASSWORD", "strapi"),
        ssl: env.bool("BACKEND_DATABASE_SSL", false) && {
          key: env("BACKEND_DATABASE_SSL_KEY", undefined),
          cert: env("BACKEND_DATABASE_SSL_CERT", undefined),
          ca: env("BACKEND_DATABASE_SSL_CA", undefined),
          capath: env("BACKEND_DATABASE_SSL_CAPATH", undefined),
          cipher: env("BACKEND_DATABASE_SSL_CIPHER", undefined),
          rejectUnauthorized: env.bool(
            "BACKEND_DATABASE_SSL_REJECT_UNAUTHORIZED",
            true,
          ),
        },
        schema: env("BACKEND_DATABASE_SCHEMA", "public"),
      },
      pool: {
        min: env.int("BACKEND_DATABASE_POOL_MIN", 2),
        max: env.int("BACKEND_DATABASE_POOL_MAX", 10),
      },
    },
    sqlite: {
      connection: {
        filename: path.join(
          __dirname,
          "..",
          "..",
          env("BACKEND_DATABASE_FILENAME", ".tmp/data.db"),
        ),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int(
        "BACKEND_DATABASE_CONNECTION_TIMEOUT",
        60000,
      ),
    },
  };
};
