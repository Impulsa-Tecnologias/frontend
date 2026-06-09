import { http } from "./http";

export type UpdateProfileDto = {
  allergy?: string;
  kitchenLevel?: "BASICO" | "MEDIO" | "ALTO" | "";
  password?: string;
};

export type UserProfile = {
  email: string;
  allergy: string;
  kitchenLevel: string;
};

export type User = {
  id: number;
  email: string;
  allergy: string;
  kitchenLevel: string;
  rol: "FINAL" | "ADMIN" | "MASTER";
};

export type CreateUserDto = {
  email: string;
  password?: string;
  rol: "FINAL" | "ADMIN" | "MASTER";
  allergy?: string;
  kitchenLevel?: "BASICO" | "MEDIO" | "ALTO" | "";
};

export type UpdatePasswordDto = {
  currentPassword: string;
  newPassword: string;
};

export const usersApi = {
  getAll: () =>
    http<User[]>("/api/v1/users"),

  create: (dto: CreateUserDto) =>
    http<User>("/api/v1/users", {
      method: "POST",
      body: JSON.stringify(dto),
    }),

  update: (id: number, dto: UpdateProfileDto) =>
    http<User>(`/api/v1/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(dto),
    }),

  delete: (id: number) =>
    http<void>(`/api/v1/users/${id}`, { 
      method: "DELETE" 
    }),
    
  updateProfile: (dto: UpdateProfileDto) =>
    http<UserProfile>("/api/v1/users/profile", {
      method: "PUT",
      body: JSON.stringify(dto),
    }),

  updatePassword: (dto: UpdatePasswordDto) =>
    http<void>("/api/v1/users/password", {
      method: "PUT",
      body: JSON.stringify(dto),
    }),

};