import { Router } from "express";
import { checkValidation } from "../middleware/validation-result";
import { body } from "express-validator";
import { prisma } from "../prismaClient";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { HttpException } from "../errors/HttpException";
import bcrypt from "bcrypt";

const router = Router();

router.post(
  "/register",
  body("email").notEmpty().isEmail(),
  body("password").notEmpty().isString(),
  body("name").notEmpty().isString(),
  checkValidation,
  asyncHandler(async (req, res) => {
    const { email, password, name } = req.body;

    const existingUser = await prisma.user.findFirst({
      where: { email },
    });

    if (existingUser) {
      throw new HttpException(400, "User already exists");
    }

    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name },
    });

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    res.status(201).send({ token });
  })
);

export { router as registerRouter };
