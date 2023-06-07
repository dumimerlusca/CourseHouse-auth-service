import { config } from "dotenv";
config();

import { errorMiddleware } from "@dumiorg/coursehouse-common";
import cors from "cors";
import express, { json } from "express";
import { currentUserRouter } from "./routes/current-user";
import { loginRouter } from "./routes/login";
import { registerRouter } from "./routes/register";

const app = express();

app.use(json());
app.use(cors());

app.use(loginRouter);
app.use(registerRouter);
app.use(currentUserRouter);

app.use(errorMiddleware);

export { app };
