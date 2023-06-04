import { Request, Router } from "express";
import { authenticationRequired } from "../middleware/authentication";

const router = Router();

router.get("/current-user", authenticationRequired, (req: Request, res) => {
  res.send(req.currentUser);
});

export { router as currentUserRouter };
