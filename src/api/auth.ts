import { http } from "./http";

export type AuthResponse = {
  token: string;
  email: string;
  rol: string;
  allergy: string;
  kitchenLevel: string;
};

export type LoginDto = {
  email: string;
  password: string;
};

export type RegisterDto = {
  email: string;
  password: string;
  allergy: string;
  kitchenLevel: "BASICO" | "MEDIO" | "ALTO";
};

export const authApi = {
  login: (dto: LoginDto) =>
    http<AuthResponse>("/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify(dto),
    }),
  register: (dto: RegisterDto) =>
    http<AuthResponse>("/api/v1/auth/register", {
      method: "POST",
      body: JSON.stringify(dto),
    }),
};