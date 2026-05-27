import { useState } from "react";

export default function CreateUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-sm w-80 px-8 py-10 flex flex-col items-center gap-6">

        {/* Avatar */}
        <div className="w-24 h-24 rounded-full border-2 border-gray-300 flex items-center justify-center bg-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            className="w-16 h-16 text-gray-500"
            fill="currentColor"
          >
            <circle cx="32" cy="22" r="12" />
            <path d="M8 54c0-13.255 10.745-24 24-24s24 10.745 24 24H8z" />
          </svg>
        </div>

        {/* Nombre */}
        <h2 className="text-xl font-bold text-gray-800 -mt-2">Usuario</h2>

        {/* Campos */}
        <div className="w-full flex flex-col gap-4">

          {/* Email */}
          <div className="flex items-center gap-3">
            <span className="text-gray-500 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <path d="M2 7l10 7 10-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>

          {/* Contraseña */}
          <div className="flex items-center gap-3">
            <span className="text-gray-500 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <circle cx="7" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <path d="M10 12h11" strokeLinecap="round"/>
                <path d="M18 12v2" strokeLinecap="round"/>
                <path d="M21 12v2" strokeLinecap="round"/>
              </svg>
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
        </div>

        {/* Botones */}
        <div className="w-full flex gap-4 mt-4">
          <button className="flex-1 py-3 border border-gray-400 rounded-lg text-sm text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-colors">
            Crear
          </button>
          <button className="flex-1 py-3 border border-gray-400 rounded-lg text-sm text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-colors">
            Cancelar
          </button>
        </div>

      </div>
    </div>
  );
}