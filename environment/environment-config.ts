import { config } from "https://deno.land/x/dotenv/mod.ts";

const isDenoDeploy = Deno.env.get("DENO_DEPLOYMENT_ID") !== undefined;

export const configure = isDenoDeploy ? () => {} : config;