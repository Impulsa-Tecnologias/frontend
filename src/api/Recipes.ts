import { http } from "./http";

export type Recipe = {
  id: number;
  recipe_title: string;
  recipe_content: string;
  chat_id?: number;
};

export type SaveRecipeDto = {
  chat_id?: number;
  recipe_title: string;
  recipe_content: string;
};

export const recipesApi = {
  getAll: () =>
    http<Recipe[]>("/api/v1/recipes/saved"),

  save: (dto: SaveRecipeDto) =>
    http<Recipe>("/api/v1/recipes/saved", {
      method: "POST",
      body: JSON.stringify(dto),
    }),

  delete: (id: number) =>
    http<void>(`/api/v1/recipes/saved/${id}`, { method: "DELETE" }),
};