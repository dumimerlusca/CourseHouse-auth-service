import request from "supertest";
import { app } from "../../app";

const makeRequest = () => request(app).post("/login");

it("should throw error if user does not exists", async () => {
  return makeRequest()
    .send({ email: "dumi@gmail.com", password: "123456" })
    .expect(400);
});

it("should throw error if passwords doesn't match", async () => {
  const email = "dumiasdasdasdagsdfsasddsfwt4@test.com";

  await request(app)
    .post("/register")
    .send({ email, password: "123456", name: "Some name" });

  return makeRequest()
    .send({ email: email, password: "badPassword" })
    .expect(400);
});

it("should login the user successfully", async () => {
  const email = "dumiegefqsdfaeghrh34easd@test.com";
  const password = "123456";

  await request(app)
    .post("/register")
    .send({ email, password, name: "Some name" });

  const { body } = await makeRequest().send({ email, password }).expect(200);

  expect(body).toHaveProperty("token");
});
