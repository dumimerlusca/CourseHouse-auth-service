import { HttpException, checkValidation } from "@dumiorg/coursehouse-common";
import bcrypt from "bcrypt";
import { Router } from "express";
import asyncHandler from "express-async-handler";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { createTokenPayload } from "../helpers";
import { UsersRepository } from "../repositories/users.repository";

const router = Router();

router.post(
  "/api/auth/login",
  body("email").isString().notEmpty().isEmail(),
  body("password").isString().notEmpty(),
  checkValidation,
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await UsersRepository.findByEmail(email);

    if (!user) {
      throw new HttpException(400, "Bad credentials");
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      throw new HttpException(400, "Bad credentials");
    }

    const token = jwt.sign(createTokenPayload(user), process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRATION_TIME,
    });

    res.send({ token });
  })
);

export { router as loginRouter };
