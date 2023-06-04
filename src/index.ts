import { app } from "./app";

startServer();

async function startServer() {
  checkEnv();

  app.listen(3000, async () => {
    console.log("Server listening on port 3000");
  });
}

function checkEnv() {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET missing!");
  }
}
