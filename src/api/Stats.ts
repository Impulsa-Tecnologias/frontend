import { http } from "./http";

export type OpenRouterStats = {
  data: {
    label: string;
    limit: number;
    usage: number;
    is_active: boolean;
  }
};

export type SystemMetrics = {
  totalUsers: number;
  activeChats: number;
  savedRecipes: number;
};

export const statsApi = {
  getIaUsage: () => http<OpenRouterStats>("/api/v1/stats/ia-usage"),
  getSystemMetrics: () => http<SystemMetrics>("/api/v1/stats/system"),
};