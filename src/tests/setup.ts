import fs from "fs";
import path from "path";
import request from "supertest";
import { app } from "../app";
import { client } from "../db/client";
import { UsersRepository } from "../repositories/users.repository";

beforeAll(async () => {
  // I need to connect to the database here in order to perform inserts/reads inside the test cases
  await client.connect();
  await UsersRepository.deleteAll();
  const sql = fs.readFileSync(
    path.join(__dirname, "../migrations/init-users-db.sql"),
    "utf-8"
  );
  try {
    // Initialize database tables if necessary, if the tables are created it will throw an error
    await client.query(sql);
  } catch (error) {}
});

afterAll(async () => {
  await UsersRepository.deleteAll();
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
