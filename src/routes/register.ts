import { HttpException, checkValidation } from "@dumiorg/coursehouse-common";
import bcrypt from "bcrypt";
import { Router } from "express";
import asyncHandler from "express-async-handler";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { UsersRepository } from "../repositories/users.repository";

const router = Router();

router.post(
  "/register",
  body("email").notEmpty().isEmail(),
  body("password").notEmpty().isString(),
  body("name").notEmpty().isString(),
  checkValidation,
  asyncHandler(async (req, res) => {
    const { email, password, name } = req.body;

    const existingUser = await UsersRepository.findByEmail(email);

    if (existingUser) {
      throw new HttpException(400, "User already exists");
    }

    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = await UsersRepository.insert({
      email,
      password: hashedPassword,
      name,
    });

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRATION_TIME }
    );

    res.status(201).send({ token });
  })
);

export { router as registerRouter };
