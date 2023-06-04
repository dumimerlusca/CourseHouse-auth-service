import request from "supertest";
import { app } from "../../app";
import { prisma } from "../../prismaClient";

const makeRequest = () => request(app).post("/register");

it("should register a user successfully", async () => {
  const email = "dumi@test.com";

  // A token should be present in the response
  const { body } = await makeRequest()
    .send({ email: email, password: "123456", name: "Dumi" })
    .expect(201);

  expect(body).toHaveProperty("token");

  // Checking to see if the user is saved to the database
  const createdUser = await prisma.user.findFirst({ where: { email } });

  expect(createdUser).not.toBeNull();
});

it("should throw an error if user already exists", async () => {
  const email = "test@test.com";

  await prisma.user.create({
    data: { email: email, name: "Some name", password: "123456" },
  });

  return makeRequest().send({ email, password: "1234563" }).expect(400);
});

it("should throw 400 errors if the received data is invalid", async () => {
  const promises = [
    makeRequest().send({ email: "bademail" }).expect(400),
    makeRequest().send({ password: "" }).expect(400),
    makeRequest().send({ password: 8 }).expect(400),
    makeRequest().send({ email: "" }).expect(400),
    makeRequest()
      .send({ email: "goodEmail@test.com", password: "asdasda", name: "" })
      .expect(400),
    makeRequest()
      .send({ email: "goodEmail@test.com", password: "", name: "Name" })
      .expect(400),
    makeRequest()
      .send({ email: "bademail", password: "goodpassword", name: "Name" })
      .expect(400),
  ];

  await Promise.all(promises);
});
