import type { EnvFunction } from "../types/shared/env";

export default ({ env }: { env: EnvFunction }) => ({
  "users-permissions": {
    config: {
      jwtSecret: env("BACKEND_JWT_SECRET"),
    },
  },
});
