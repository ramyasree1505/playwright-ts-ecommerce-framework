import { env } from "../../../config/env";

type LoginPayload = {
  userEmail: string;
  userPassword: string;
};

export const loginPayLoad: LoginPayload = {
  userEmail: env.username,
  userPassword: env.password
};