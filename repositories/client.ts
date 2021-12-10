import { MongoClient } from "https://deno.land/x/mongo@v0.28.1/mod.ts";

export async function getClient() : Promise<MongoClient> {

  const client = new MongoClient();

  await client.connect({
    db: Deno.env.get('DEFAULT_DATABASE') as unknown as string,
    tls: true,
    servers: [
      {
        host: Deno.env.get('DB_SERVER_1_HOST') as unknown as string,
        port: parseInt(Deno.env.get('DB_SERVER_1_PORT') as unknown as string),
      },
      {
        host: Deno.env.get('DB_SERVER_2_HOST') as unknown as string,
        port: parseInt(Deno.env.get('DB_SERVER_2_PORT') as unknown as string),
      },
      {
        host: Deno.env.get('DB_SERVER_3_HOST') as unknown as string,
        port: parseInt(Deno.env.get('DB_SERVER_3_PORT') as unknown as string),
      },
    ],
    credential: {
      username: Deno.env.get('DB_POL_USER_NAME') as unknown as string,
      password: Deno.env.get('DB_POL_PASSWORD') as unknown as string,
      db: Deno.env.get('DEFAULT_DATABASE') as unknown as string,
      mechanism: "SCRAM-SHA-1",
    },
  });

  return new Promise((resolve) => { resolve(client) });
}