import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { chatsApi, type Chat } from "../api/Chats";

type Props = {
  onClose: () => void;
  onNavigate?: (page: string) => void;
  current?: string;
  onSelectChat?: (chat: Chat) => void;
  refreshTrigger?: number;
};

export default function SidebarMenu({ onClose, onNavigate, current, onSelectChat, refreshTrigger }: Props) {
  const { user, logout } = useAuth();
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    chatsApi.getAll()
      .then(setChats)
      .catch(console.error);
  }, [refreshTrigger]);

  const nav = (page: string) => {
    onNavigate?.(page);
    onClose();
  };

  const handleSelectChat = (chat: Chat) => {
    console.log("Chat seleccionado:", chat);
    onSelectChat?.(chat);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-4 space-y-1 mt-10">
        <button onClick={() => nav("perfil")}
          className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${current === "perfil" ? "bg-gray-100 dark:bg-gray-800 font-medium" : "hover:bg-gray-100 dark:hover:bg-gray-800"} text-gray-800 dark:text-gray-200 cursor-pointer`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round"/>
          </svg>
          Perfil
        </button>

        <button onClick={() => nav("recetas")}
          className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${current === "recetas" ? "bg-gray-100 dark:bg-gray-800 font-medium" : "hover:bg-gray-100 dark:hover:bg-gray-800"} text-gray-800 dark:text-gray-200 cursor-pointer`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path d="M3 6h18M3 12h12M3 18h8" strokeLinecap="round"/>
          </svg>
          Recetas
        </button>

        <button onClick={() => nav("chat")}
          className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${current === "chat" ? "bg-gray-100 dark:bg-gray-800 font-medium" : "hover:bg-gray-100 dark:hover:bg-gray-800"} text-gray-800 dark:text-gray-200 cursor-pointer`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Nuevo chat
        </button>

        <hr className="border-gray-200 dark:border-gray-700 my-3"/>

        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 px-3 mb-2">Chats</p>

        <div className="flex flex-col gap-1 overflow-y-auto max-h-60">
          {chats.length === 0 && (
            <p className="text-xs text-gray-400 px-3">No hay chats aún</p>
          )}
          {chats.map((chat) => (
            <button key={chat.id} onClick={() => handleSelectChat(chat)}
              className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-left w-full">
              <span className="text-sm text-gray-700 dark:text-gray-300 truncate">{chat.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
            </svg>
          </div>
          <span className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-[120px]">{user?.email ?? "Email"}</span>
        </div>
        <button onClick={logout} className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}