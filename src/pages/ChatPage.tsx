import { useState, useEffect, useRef } from "react";
import { chatsApi, type Chat, type Message } from "../api/Chats";
import ReactMarkdown from "react-markdown";

const objectives = [
  "Aprender recetas nuevas",
  "Mejorar tecnicas",
  "Cocinar mas saludable",
  "Reducir desperdicios",
  "Cocinar para eventos",
  "Experimentar sabores",
];

interface ChatPageProps {
  initialChat?: Chat | null;
  onChatCreated?: () => void;
}

export default function ChatPage({ initialChat, onChatCreated }: ChatPageProps) {
  console.log("ChatPage render - initialChat:", initialChat);
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<Chat | null>(initialChat ?? null);

  useEffect(() => {
    if (initialChat) setActiveChat(initialChat);
  }, [initialChat]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [editingChat, setEditingChat] = useState<Chat | null>(null);
  const [showNewChat, setShowNewChat] = useState(false);
  const [chatName, setChatName] = useState("");
  const [selectedObjectives, setSelectedObjectives] = useState<string[]>([]);
  const [otroObjective, setOtroObjective] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setError("");
    chatsApi.getAll()
      .then(setChats)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!activeChat) return;
    setError("");
    chatsApi.getMessages(activeChat.id)
      .then(setMessages)
      .catch((e) => setError(e.message));
  }, [activeChat]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const createChat = async () => {
    const objective = [...selectedObjectives, otroObjective].filter(Boolean).join(" ");
    if (!chatName.trim()) { setError("Escribe un nombre para el chat."); return; }
    if (!objective.trim()) { setError("Selecciona al menos un objetivo."); return; }
    try {
      const newChat = await chatsApi.create({ name: chatName, foodObjective: objective });
      setChats((prev) => [...prev, newChat]);
      setActiveChat(newChat);
      onChatCreated?.();
      setShowNewChat(false);
      setChatName("");
      setSelectedObjectives([]);
      setOtroObjective("");
      setError("");
    } catch (e: any) {
      setError(e.message);
    }
  };

  const deleteChat = async (id: number) => {
    try {
      await chatsApi.delete(id);
      setChats((prev) => prev.filter((c) => c.id !== id));
      if (activeChat?.id === id) { setActiveChat(null); setMessages([]); }
      setEditingChat(null);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const sendMessage = async () => {
    if (!message.trim() || !activeChat || sending) return;
    const content = message;
    setMessage("");
    setSending(true);
    setError("");

    try {
      // Add user message optimistically
      const userMsg: Message = {
        id: Date.now(),
        chatId: activeChat.id,
        sender: "USUARIO",
        content,
        sendDate: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMsg]);
      const botMsg = await chatsApi.sendMessage(activeChat.id, content);
      setMessages((prev) => [...prev, botMsg]);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSending(false);
    }
  };

  const toggleObjective = (obj: string) =>
    setSelectedObjectives((prev) =>
      prev.includes(obj) ? prev.filter((o) => o !== obj) : [...prev, obj]
    );

  // Vista chat activo
  if (activeChat) return (
    <div className="flex flex-col h-[80vh] max-w-lg mx-auto ">
      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => { setActiveChat(null); setMessages([]); }}
          className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200">{activeChat.name}</h2>
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col gap-4 pb-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
        {/* {messages.filter(Boolean).map((msg) => (
          <div key={msg.id} className={`flex gap-2 ${msg.sender?.toUpperCase() === "USUARIO" ? "flex-row-reverse" : "flex-row"}`}>
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
              </svg>
            </div>
            <div className={`max-w-[70%] flex flex-col gap-1 ${msg.sender?.toUpperCase() === "USUARIO" ? "items-end" : "items-start"}`}>
              <div className={`text-sm px-3 py-2 rounded-xl prose dark:prose-invert max-w-none ${
                msg.sender?.toUpperCase() === "USUARIO" 
                  ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900" 
                  : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              }`}>
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
              <span className="text-xs text-gray-400">{msg.sendDate ? new Date(msg.sendDate).toLocaleDateString() : ""}</span>
            </div>
          </div>
        ))} */}
        {messages.filter(Boolean).map((msg) => (
          <div key={msg.id} className={`flex gap-2 ${msg.sender?.toUpperCase() === "USUARIO" ? "flex-row-reverse" : "flex-row"}`}>
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
              </svg>
            </div>
            <div className={`max-w-[70%] flex flex-col gap-1 ${msg.sender?.toUpperCase() === "USUARIO" ? "items-end" : "items-start"}`}>
              <div className={`text-sm px-3 py-2 rounded-xl prose dark:prose-invert max-w-none ${
                msg.sender?.toUpperCase() === "USUARIO" 
                  ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900" 
                  : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              }`}>
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
              <span className="text-xs text-gray-400">{msg.sendDate ? new Date(msg.sendDate).toLocaleDateString() : ""}</span>
            </div>
          </div>
        ))}
        {sending && (
          <div className="flex gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
              </svg>
            </div>
            <p className="text-sm px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-400">Escribiendo...</p>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {error && <p className="text-xs text-red-500 mb-2">{error}</p>}

      <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-xl px-3 py-2 bg-white dark:bg-gray-900">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Mensaje"
          className="flex-1 bg-transparent text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 outline-none"
        />
        <button onClick={sendMessage} disabled={sending} className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 disabled:opacity-40 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );

  // Modal nuevo chat
  if (showNewChat) return (
    <div className="max-w-sm mx-auto">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 flex flex-col gap-4">
        <h2 className="text-xl font-bold text-center text-gray-900 dark:text-gray-50">Nuevo chat</h2>

        <input
          type="text"
          value={chatName}
          onChange={(e) => setChatName(e.target.value)}
          placeholder="Nombre del chat"
          className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 outline-none"
        />

        <p className="text-sm text-center text-gray-500 dark:text-gray-400">Objetivos</p>

        <div className="grid grid-cols-2 gap-2">
          {objectives.map((obj) => (
            <label key={obj} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={selectedObjectives.includes(obj)} onChange={() => toggleObjective(obj)}
                className="accent-gray-900 dark:accent-gray-100 w-4 h-4"/>
              <span className="text-sm text-gray-700 dark:text-gray-300">{obj}</span>
            </label>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700 dark:text-gray-300 shrink-0">Otro</span>
          <input type="text" value={otroObjective} onChange={(e) => setOtroObjective(e.target.value)}
            placeholder="Escribe aquí"
            className="flex-1 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-1.5 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 outline-none"/>
        </div>

        {error && <p className="text-xs text-red-500">{error}</p>}

        <div className="flex gap-3">
          <button onClick={() => { setShowNewChat(false); setError(""); }}
            className="flex-1 py-2.5 text-sm border border-gray-300 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            Cancelar
          </button>
          <button onClick={createChat}
            className="flex-1 py-2.5 text-sm bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:opacity-80 transition-opacity">
            Crear
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
          className="text-sm text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-800 transition-colors cursor-pointer">
          + Nuevo
        </button>
      </div>

      {loading && <p className="text-sm text-center text-gray-400">Cargando chats...</p>}
      {error && <p className="text-sm text-center text-red-500">{error}</p>}

      <div className="flex flex-col divide-y divide-gray-300 dark:divide-gray-800">
        {chats.map((chat) => (
          <div key={chat.id}>
            <div className="flex items-center justify-between p-2 hover:bg-gray-200">
              <button onClick={() => setActiveChat(chat)} className="text-sm text-gray-800 dark:text-gray-200 text-left flex-1 hover:text-black dark:hover:text-white">
                {chat.name}
              </button>
              <button onClick={() => setEditingChat(editingChat?.id === chat.id ? null : chat)}
                className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors ml-2 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" strokeLinecap="round"/>
                  <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </button>
            </div>

            {editingChat?.id === chat.id && (
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-2 flex flex-col gap-3 shadow-md">
                <h3 className="font-bold text-gray-900 dark:text-gray-50">{chat.name}</h3>
                <div className="flex justify-between">
                  <button onClick={() => setEditingChat(null)} className="p-2 rounded-full border border-gray-300 dark:border-gray-700 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6" strokeLinecap="round"/>
                    </svg>
                  </button>
                  <button onClick={() => deleteChat(chat.id)} className="p-2 rounded-full border border-red-300 dark:border-red-700 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/>
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        {!loading && chats.length === 0 && (
          <div className="flex flex-col items-center gap-3 mt-10 text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-50">¿Qué vamos a preparar hoy?</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Crea un nuevo chat para comenzar</p>
          </div>
        )}
      </div>
    </div>
  );
}