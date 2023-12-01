import type { EnvFunction } from "../types/shared/env";

export default ({ env }: { env: EnvFunction }) => ({
  host: env("BACKEND_HOST", "0.0.0.0"),
  port: env.int("BACKEND_PORT", 1337),
  app: {
    keys: env.array("BACKEND_APP_KEYS"),
  },
  webhooks: {
    populateRelations: env.bool("BACKEND_WEBHOOKS_POPULATE_RELATIONS", false),
  },
});
