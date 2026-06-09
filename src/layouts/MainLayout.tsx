import { useState } from "react";
import SidebarMenu from "../components/SidebarMenu";
import ProfilePage from "../pages/ProfilePage";
import RecipesPage from "../pages/RecipesPage";
import ChatPage from "../pages/ChatPage";
import { useTheme } from "../hook/ThemeProvider";
import { type Chat } from "../api/Chats";

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [page, setPage] = useState("chat");
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [chatKey, setChatKey] = useState(0);
  const [chatRefresh, setChatRefresh] = useState(0);
  const { theme, toggleTheme } = useTheme();

  const handleChatCreated = () => setChatRefresh((n) => n + 1);

  const renderContent = () => {
    switch (page) {
      case "perfil": return <ProfilePage />;
      case "recetas": return <RecipesPage />;
      default: return <ChatPage key={chatKey} initialChat={selectedChat} onChatCreated={handleChatCreated} />;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-950 relative">
      {sidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black/30" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed z-30 top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <SidebarMenu
          onClose={() => setSidebarOpen(false)}
          onNavigate={(p) => { setPage(p); if (p === "chat") setSelectedChat(null); }}
          current={page}
          onSelectChat={(chat) => {
            console.log("MainLayout recibió chat:", chat);
            setSidebarOpen(false);
            setTimeout(() => {
              setSelectedChat(chat);
              setPage("chat");
              setChatKey((k) => k + 1);
            }, 0);
          }}
          refreshTrigger={chatRefresh}
        />
      </aside>

      <main className="flex-1 flex flex-col">
        <div className="p-4 flex justify-between items-center">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="5" cy="12" r="1.5"/>
              <circle cx="12" cy="12" r="1.5"/>
              <circle cx="19" cy="12" r="1.5"/>
            </svg>
          </button>
          <button onClick={toggleTheme} aria-label="Cambiar tema"
            className="p-2.5 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
            {theme === "dark" ? (
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <circle cx="12" cy="12" r="4"/>
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
        </div>
        <div className="flex-1 px-4 pb-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}