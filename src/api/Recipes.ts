import { http } from "./http";

export type UpdateProfileDto = {
  allergy?: string;
  kitchenLevel?: "BASICO" | "MEDIO" | "ALTO";
  password?: string;
};

export type UserProfile = {
  email: string;
  allergy: string;
  kitchenLevel: string;
};

export const usersApi = {
  updateProfile: (dto: UpdateProfileDto) =>
    http<UserProfile>("/api/v1/users/profile", {
      method: "PUT",
      body: JSON.stringify(dto),
    }),
};