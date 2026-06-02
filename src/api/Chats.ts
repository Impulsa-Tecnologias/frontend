import { http } from "./http";

export type Chat = {
  id: number;
  name: string;
  foodObjective: string;
};

export type CreateChatDto = {
  name: string;
  foodObjective: string;
};

export type Message = {
  id: number;
  content: string;
  sender: "USER" | "BOT";
  date: string;
};

export const chatsApi = {
  getAll: () =>
    http<Chat[]>("/api/v1/chats"),

  create: (dto: CreateChatDto) =>
    http<Chat>("/api/v1/chats", {
      method: "POST",
      body: JSON.stringify(dto),
    }),

  delete: (id: number) =>
    http<void>(`/api/v1/chats/${id}`, { method: "DELETE" }),

  getMessages: (id: number) =>
    http<Message[]>(`/api/v1/chats/${id}/messages`),

  sendMessage: (id: number, content: string) =>
    http<{ userMessage: Message; botMessage: Message }>(
      `/api/v1/chats/${id}/messages`,
      { method: "POST", body: JSON.stringify({ content }) }
    ),
};