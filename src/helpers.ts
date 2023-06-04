import { User } from "@prisma/client";

export const createTokenPayload = ({ id, email, isAdmin, name }: User) => {
  return { id, email, isAdmin, name };
};
