import { useState } from "react";

interface EyeIconProps {
  show: boolean;
  onClick: () => void;
}

interface LoginProps {
  onGoToRegister: () => void;
}

interface RegisterProps {
  onGoToLogin: () => void;
}

const EyeIcon = ({ show, onClick }: EyeIconProps) => (
  <button type="button" onClick={onClick} className="text-gray-400 hover:text-gray-600 focus:outline-none">
    {show ? (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M3 12s3.5-7 9-7 9 7 9 7-3.5 7-9 7-9-7-9-7z" strokeLinecap="round"/>
        <circle cx="12" cy="12" r="3" strokeWidth="1.5"/>
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-5.5 0-9-7-9-7a17.6 17.6 0 014.06-5.06M9.9 4.24A9.12 9.12 0 0112 4c5.5 0 9 7 9 7a17.6 17.6 0 01-2.06 3.07M3 3l18 18" strokeLinecap="round"/>
      </svg>
    )}
  </button>
);

function Login({ onGoToRegister }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-sm flex flex-col items-center gap-5">

        <div className="w-full">
          <h1 className="text-2xl font-bold text-gray-900">Inicio de sesión</h1>
          <p className="text-sm text-gray-500 mt-1">Ingresa tu correo y contraseña para iniciar sesión</p>
        </div>

        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700">Correo</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-3 gap-2 focus-within:ring-2 focus-within:ring-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <path d="M2 7l10 7 10-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@address.com"
                className="flex-1 text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700">Contraseña</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-3 gap-2 focus-within:ring-2 focus-within:ring-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round"/>
              </svg>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="flex-1 text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
              />
              <EyeIcon show={showPassword} onClick={() => setShowPassword(!showPassword)} />
            </div>
          </div>
        </div>

        <button className="w-full py-4 bg-gray-800 hover:bg-gray-900 active:bg-black text-white text-sm font-medium rounded-lg transition-colors">
          Inicia sesión
        </button>

        <p className="text-sm text-gray-500">
          ¿No tienes tu cuenta?{" "}
          <button onClick={onGoToRegister} className="underline text-gray-800 font-medium hover:text-black">
            Ingresa aquí
          </button>
        </p>
      </div>
    </div>
  );
}

function Register({ onGoToLogin }: RegisterProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-sm flex flex-col items-center gap-5">

        <div className="w-full">
          <h1 className="text-2xl font-bold text-gray-900">Crea tu cuenta</h1>
        </div>

        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700">Correo</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-3 gap-2 focus-within:ring-2 focus-within:ring-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <path d="M2 7l10 7 10-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@address.com"
                className="flex-1 text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700">Contraseña</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-3 gap-2 focus-within:ring-2 focus-within:ring-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round"/>
              </svg>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="flex-1 text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
              />
              <EyeIcon show={showPassword} onClick={() => setShowPassword(!showPassword)} />
            </div>
          </div>
        </div>

        <button className="w-full py-4 bg-gray-800 hover:bg-gray-900 active:bg-black text-white text-sm font-medium rounded-lg transition-colors">
          Crear cuenta
        </button>

        <p className="text-sm text-gray-500">
          ¿Ya tienes tu cuenta?{" "}
          <button onClick={onGoToLogin} className="underline text-gray-800 font-medium hover:text-black">
            Ingresa aquí
          </button>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  const [view, setView] = useState<"login" | "register">("login");

  return view === "login"
    ? <Login onGoToRegister={() => setView("register")} />
    : <Register onGoToLogin={() => setView("login")} />;
}