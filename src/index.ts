import { app } from "./app";
import { connectToDatabase } from "./db/client";

startServer();

async function startServer() {
  checkEnv();

  await connectToDatabase();

  app.listen(process.env.PORT, async () => {
    console.log(`Auth service listening on port ${process.env.PORT}`);
  });
}

function checkEnv() {
  if (!process.env.PORT) {
    throw new Error("PORT missing!");
  }
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET missing!");
  }
  if (!process.env.JWT_EXPIRATION_TIME) {
    throw new Error("JWT_EXPIRATION_TIME missing!");
  }
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL missing!");
  }
}
