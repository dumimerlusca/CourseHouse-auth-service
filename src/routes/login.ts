import { Router } from "express";
import { checkValidation } from "../middleware/validation-result";
import { body } from "express-validator";
import { prisma } from "../prismaClient";
import asyncHandler from "express-async-handler";
import { HttpException } from "../errors/HttpException";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createTokenPayload } from "../helpers";

const router = Router();

router.post(
  "/login",
  body("email").isString().notEmpty().isEmail(),
  body("password").isString().notEmpty(),
  checkValidation,
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      throw new HttpException(400, "Bad credentials");
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      throw new HttpException(400, "Bad credentials");
    }

    const token = jwt.sign(createTokenPayload(user), process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.send({ token });
  })
);

export { router as loginRouter };
