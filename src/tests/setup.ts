import { app } from "../app";
import { prisma } from "../prismaClient";
import request from "supertest";

afterEach(async () => {
  await prisma.user.deleteMany({});
});

declare global {
  var getAuthToken: () => Promise<string>;
  var getAuthHeader: () => Promise<string>;
}

global.getAuthToken = async () => {
  const { body } = await request(app)
    .post("/register")
    .send({ email: "test@test.com", password: "123456", name: "Some name" })
    .expect(201);
  expect(body).toHaveProperty("token");
  return body.token;
};
global.getAuthHeader = async () => {
  const token = await global.getAuthToken();
  return `Bearer ${token}`;
};
