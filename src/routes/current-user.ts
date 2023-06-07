import { authenticationRequired } from "@dumiorg/coursehouse-common";
import { Request, Router } from "express";

const router = Router();

router.get("/current-user", authenticationRequired, (req: Request, res) => {
  res.send(req.currentUser);
});

export { router as currentUserRouter };
