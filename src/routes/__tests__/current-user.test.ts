import request from "supertest";
import { app } from "../../app";

it("should return the curent loged in user", async () => {
  const authHeader = await global.getAuthHeader();

  const { body: currentUser } = await request(app)
    .get("/current-user")
    .set("authorization", authHeader)
    .expect(200);

  expect(currentUser).toHaveProperty("email");
});

it("should return 401 if no token is provided", async () => {
  return request(app).get("/current-user").expect(401);
});

it("should return 401 if token is not valid", async () => {
  return request(app)
    .get("/current-user")
    .set("authorization", `Bearer ashdbahsdbhad`)
    .expect(401);
});
