import { useAuth } from "../context/AuthContext";

type Props = {
  onClose: () => void;
  onNavigate?: (page: string) => void;
  current?: string;
};

export default function AdminSidebarMenu({ onClose, onNavigate, current }: Props) {
  const { user, logout } = useAuth();

  const nav = (page: string) => {
    onNavigate?.(page);
    onClose();
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

        <button onClick={() => nav("usuarios")}
          className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${current === "usuarios" ? "bg-gray-100 dark:bg-gray-800 font-medium" : "hover:bg-gray-100 dark:hover:bg-gray-800"} text-gray-800 dark:text-gray-200 cursor-pointer`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeLinecap="round"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeLinecap="round"/>
          </svg>
          Usuarios
        </button>

        <button onClick={() => nav("estadisticas")}
          className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${current === "estadisticas" ? "bg-gray-100 dark:bg-gray-800 font-medium" : "hover:bg-gray-100 dark:hover:bg-gray-800"} text-gray-800 dark:text-gray-200 cursor-pointer `}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path d="M23 6l-9.5 9.5-5-5L1 18" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Estadísticas
        </button>

        <hr className="border-gray-200 dark:border-gray-700 my-3"/>
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 px-3">{user?.rol ?? ""}</p>
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