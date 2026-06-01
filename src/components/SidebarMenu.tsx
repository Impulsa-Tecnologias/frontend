import { useAuth } from "../context/AuthContext";

type Props = {
  onClose: () => void;
  onNavigate?: (page: string) => void;
  current?: string;
};

export default function SidebarMenu({ onClose, onNavigate, current }: Props) {
  const { user, logout } = useAuth();

  const nav = (page: string) => {
    onNavigate?.(page);
    onClose();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Top nav */}
      <div className="flex-1 p-4 space-y-1 mt-10">
        <button
          onClick={() => nav("perfil")}
          className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${current === "perfil" ? "bg-gray-100 dark:bg-gray-800 font-medium" : "hover:bg-gray-50 dark:hover:bg-gray-800"} text-gray-800 dark:text-gray-200`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round"/>
          </svg>
          Perfil
        </button>

        <button
          onClick={() => nav("recetas")}
          className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${current === "recetas" ? "bg-gray-100 dark:bg-gray-800 font-medium" : "hover:bg-gray-50 dark:hover:bg-gray-800"} text-gray-800 dark:text-gray-200`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path d="M3 6h18M3 12h12M3 18h8" strokeLinecap="round"/>
            <path d="M18 14l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Recetas
        </button>

        <button
          onClick={() => nav("chat")}
          className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${current === "chat" ? "bg-gray-100 dark:bg-gray-800 font-medium" : "hover:bg-gray-50 dark:hover:bg-gray-800"} text-gray-800 dark:text-gray-200`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Nuevo chat
        </button>

        <hr className="border-gray-200 dark:border-gray-700 my-3"/>

        {/* Lista de chats */}
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 px-3 mb-2">Chats</p>
        {["Title chat", "Title chat", "Title chat", "Title chat"].map((chat, i) => (
          <div key={i} className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer group">
            <span className="text-sm text-gray-700 dark:text-gray-300 truncate">{chat}</span>
            <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" strokeLinecap="round"/>
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Bottom user */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
            </svg>
          </div>
          <span className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-[120px]">{user?.username ?? "Email"}</span>
        </div>
        <button onClick={logout} className="text-gray-400 hover:text-red-500 transition-colors" title="Cerrar sesión">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}