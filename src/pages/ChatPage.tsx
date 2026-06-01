import { useState } from "react";

type Message = { id: number; text: string; from: "user" | "bot"; date: string };
type Chat = { id: number; title: string; messages: Message[] };

const mockChats: Chat[] = [
  { id: 1, title: "Title chat 1", messages: [
    { id: 1, text: "Hola, ¿qué vamos a preparar hoy?", from: "bot", date: "2025-12-04" },
    { id: 2, text: "Quiero hacer una pasta carbonara", from: "user", date: "2025-12-04" },
    { id: 3, text: "Excelente elección. Necesitas: pasta, huevos, panceta, queso parmesano y pimienta negra.", from: "bot", date: "2025-12-04" },
  ]},
  { id: 2, title: "Title chat 2", messages: [
    { id: 1, text: "¿Qué puedo hacer con pollo y arroz?", from: "user", date: "2025-12-04" },
    { id: 2, text: "Te recomiendo un arroz con pollo al estilo mediterráneo.", from: "bot", date: "2025-12-04" },
  ]},
];

const objectives = [
  { id: 1, label: "Aprender recetas nuevas" },
  { id: 2, label: "Mejorar técnicas" },
  { id: 3, label: "Cocinar más saludable" },
  { id: 4, label: "Reducir desperdicios" },
  { id: 5, label: "Cocinar para eventos" },
  { id: 6, label: "Experimentar sabores" },
];

export default function ChatPage() {
  const [chats, setChats] = useState<Chat[]>(mockChats);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [message, setMessage] = useState("");
  const [editingChat, setEditingChat] = useState<Chat | null>(null);
  const [newChatName, setNewChatName] = useState("");
  const [showNewChat, setShowNewChat] = useState(false);
  const [selectedObjectives, setSelectedObjectives] = useState<number[]>([]);
  const [otroObjective, setOtroObjective] = useState("");

  const sendMessage = () => {
    if (!message.trim() || !activeChat) return;
    const newMsg: Message = { id: Date.now(), text: message, from: "user", date: new Date().toISOString().split("T")[0] };
    const updated = chats.map((c) => c.id === activeChat.id ? { ...c, messages: [...c.messages, newMsg] } : c);
    setChats(updated);
    setActiveChat(updated.find((c) => c.id === activeChat.id) ?? null);
    setMessage("");
  };

  const deleteChat = (id: number) => {
    setChats(chats.filter((c) => c.id !== id));
    if (activeChat?.id === id) setActiveChat(null);
    setEditingChat(null);
  };

  const renameChat = () => {
    if (!newChatName.trim() || !editingChat) return;
    setChats(chats.map((c) => c.id === editingChat.id ? { ...c, title: newChatName } : c));
    setEditingChat(null);
    setNewChatName("");
  };

  const createChat = () => {
    const newChat: Chat = { id: Date.now(), title: `Nuevo chat ${chats.length + 1}`, messages: [] };
    setChats([...chats, newChat]);
    setActiveChat(newChat);
    setShowNewChat(false);
    setSelectedObjectives([]);
    setOtroObjective("");
  };

  const toggleObjective = (id: number) => {
    setSelectedObjectives((prev) => prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]);
  };

  // Vista de chat activo
  if (activeChat) return (
    <div className="flex flex-col h-[80vh] max-w-lg mx-auto">
      <div className="flex-1 overflow-y-auto flex flex-col gap-4 pb-4">
        {activeChat.messages.map((msg) => (
          <div key={msg.id} className={`flex gap-2 ${msg.from === "user" ? "flex-row-reverse" : "flex-row"}`}>
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
              </svg>
            </div>
            <div className={`max-w-[70%] ${msg.from === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
              <p className={`text-sm px-3 py-2 rounded-xl ${msg.from === "user" ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900" : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"}`}>
                {msg.text}
              </p>
              <span className="text-xs text-gray-400">{msg.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-xl px-3 py-2 bg-white dark:bg-gray-900">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Mensaje"
          className="flex-1 bg-transparent text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 outline-none"
        />
        <button onClick={sendMessage} className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );

  // Modal nuevo chat con objetivos
  if (showNewChat) return (
    <div className="max-w-sm mx-auto">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 flex flex-col gap-4">
        <h2 className="text-xl font-bold text-center text-gray-900 dark:text-gray-50">Objetivos</h2>
        <p className="text-sm text-center text-gray-500 dark:text-gray-400">Queremos saber qué objetivo tienes.</p>

        <div className="grid grid-cols-2 gap-2">
          {objectives.map((obj) => (
            <label key={obj.id} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={selectedObjectives.includes(obj.id)} onChange={() => toggleObjective(obj.id)}
                className="accent-gray-900 dark:accent-gray-100 w-4 h-4"/>
              <span className="text-sm text-gray-700 dark:text-gray-300">{obj.label}</span>
            </label>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700 dark:text-gray-300">Otro</span>
          <input type="text" value={otroObjective} onChange={(e) => setOtroObjective(e.target.value)}
            placeholder="Placeholder"
            className="flex-1 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-1.5 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 outline-none"/>
          <button onClick={createChat} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

  // Lista de chats
  return (
    <div className="max-w-lg mx-auto flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-50">Chats</h1>
        <button onClick={() => setShowNewChat(true)}
          className="text-sm text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          + Nuevo
        </button>
      </div>

      <div className="flex flex-col divide-y divide-gray-100 dark:divide-gray-800">
        {chats.map((chat) => (
          <div key={chat.id}>
            <div className="flex items-center justify-between py-3">
              <button onClick={() => setActiveChat(chat)} className="text-sm text-gray-800 dark:text-gray-200 text-left flex-1 hover:text-black dark:hover:text-white">
                {chat.title}
              </button>
              <button onClick={() => { setEditingChat(chat); setNewChatName(chat.title); }}
                className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" strokeLinecap="round"/>
                  <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </button>
            </div>

            {/* Modal editar chat */}
            {editingChat?.id === chat.id && (
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-2 flex flex-col gap-3 shadow-md">
                <h3 className="font-bold text-gray-900 dark:text-gray-50">{chat.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">¿Cambiar nombre?</p>
                <div className="flex items-center gap-2">
                  <input type="text" value={newChatName} onChange={(e) => setNewChatName(e.target.value)}
                    placeholder="Nuevo nombre del chat"
                    className="flex-1 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-1.5 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 outline-none"/>
                  <button onClick={renameChat} className="text-gray-600 dark:text-gray-400 hover:text-gray-900">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1-4l-3 3m0 0l-3-3m3 3V4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
                <div className="flex justify-between">
                  <button onClick={() => setEditingChat(null)} className="p-2 rounded-full border border-gray-300 dark:border-gray-700 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6" strokeLinecap="round"/>
                    </svg>
                  </button>
                  <button onClick={() => deleteChat(chat.id)} className="p-2 rounded-full border border-red-300 dark:border-red-700 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/>
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {chats.length === 0 && (
        <div className="flex flex-col items-center gap-4 mt-10 text-center">
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-50">¿Que vamos a preparar hoy?</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Crea un nuevo chat para comenzar</p>
        </div>
      )}
    </div>
  );
}
