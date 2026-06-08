import { http } from "./http";

export type Recipe = {
  id: number;
  recipeTitle: string;
  recipeContent: string;
  chatId?: number;
};

export type SaveRecipeDto = {
  chatId?: number;
  recipeTitle: string;
  recipeContent: string;
};

export const recipesApi = {
  getAll: () =>
    http<Recipe[]>("/api/v1/recipes/saved"),

  getById: (id: number) =>
    http<Recipe>(`/api/v1/recipes/saved/${id}`),

  save: (dto: SaveRecipeDto) =>
    http<Recipe>("/api/v1/recipes/saved", {
      method: "POST",
      body: JSON.stringify(dto),
    }),

  delete: (id: number) =>
    http<void>(`/api/v1/recipes/saved/${id}`, { 
      method: "DELETE" 
    }),
};