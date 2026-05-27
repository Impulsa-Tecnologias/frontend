import { useState } from "react";

export default function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-sm w-80 px-8 py-10 flex flex-col items-center gap-8">

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
              className="w-full bg-gray-100 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>

          {/* Password */}
          <div className="flex items-center gap-3">
            <span className="text-gray-500 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path d="M3 17l3-8 5 5 4-8 3 8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 17h18" strokeLinecap="round"/>
                <path d="M3 20h18" strokeLinecap="round"/>
              </svg>
            </span>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-gray-100 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
        </div>

        {/* Botones */}
        <div className="w-full flex flex-col gap-3">
          <button className="w-full py-3 border border-gray-400 rounded-lg text-sm text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-colors">
            Iniciar sesión
          </button>
          <button className="w-full py-3 border border-gray-300 rounded-lg text-sm text-gray-400 hover:bg-gray-50 active:bg-gray-100 transition-colors">
            Registro
          </button>
        </div>

      </div>
    </div>
  );
}