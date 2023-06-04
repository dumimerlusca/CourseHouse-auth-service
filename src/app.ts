import express from "express";
import cors from "cors";

import { json } from "express";
import { errorMiddleware } from "./middleware/error";
import { loginRouter } from "./routes/login";
import { registerRouter } from "./routes/register";
import { currentUserRouter } from "./routes/current-user";

const app = express();

app.use(json());
app.use(cors());

app.use(loginRouter);
app.use(registerRouter);
app.use(currentUserRouter);

app.use(errorMiddleware);

export { app };
