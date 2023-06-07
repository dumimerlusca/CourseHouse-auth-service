import { Client } from "pg";

export const client = new Client(process.env.DATABASE_URL);

export const connectToDatabase = async () => {
  await client.connect();
};
