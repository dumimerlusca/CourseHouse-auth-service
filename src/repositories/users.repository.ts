import { v4 as uuidv4 } from "uuid";
import { client } from "../db/client";

type UserDoc = {
  email: string;
  password: string;
  name: string;
  id: string;
};

export class UsersRepository {
  static async insert({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }): Promise<UserDoc> {
    const id = uuidv4();

    const res = await client.query(
      `INSERT INTO users(email, password, name, id) VALUES('${email}', '${password}', '${name}', '${id}') RETURNING *`
    );
    return res.rows[0];
  }

  static async findByEmail(email: string): Promise<UserDoc | undefined> {
    const res = await client.query(
      `SELECT * FROM users WHERE email='${email}'`
    );
    return res.rows[0];
  }

  static async deleteAll() {
    await client.query(`DELETE FROM users`);
  }
}
