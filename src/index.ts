import { app } from "./app";
import { connectToDatabase } from "./db/client";

startServer();

async function startServer() {
  checkEnv();

  await connectToDatabase();

  app.listen(3001, async () => {
    console.log("Auth service listening on port 3001");
  });
}

function checkEnv() {
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
