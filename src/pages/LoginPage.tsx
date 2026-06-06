import { useState } from "react";
import { useTheme } from "../hook/ThemeProvider";
import { authApi } from "../api/auth";
import { useAuth } from "../context/AuthContext";

interface LoginProps {
  onGoToRegister: () => void;
}

interface RegisterProps {
  onGoToLogin: () => void;
  onGoToOnboarding: () => void;
}

function Login({ onGoToRegister }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    try {
      setLoading(true);
      const res = await authApi.login({ email, password });
      login(res.token, res.email, res.rol, res.allergy ?? "", res.kitchenLevel ?? "");
    } catch (e: any) {
      setError(e.message || "Error al iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center px-6">
      <div className="w-full max-w-sm flex flex-col gap-5">

        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Inicio de sesión</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Ingresa tu correo y contraseña para iniciar sesión</p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600 dark:text-gray-400">Correo</label>
            <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-3 bg-white dark:bg-gray-900">
              <svg className="w-5 h-5 text-gray-400 dark:text-gray-600 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M2 7l10 7 10-7" strokeLinecap="round"/>
              </svg>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@address.com"
                className="flex-1 bg-transparent text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600 dark:text-gray-400">Contraseña</label>
            <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-3 bg-white dark:bg-gray-900">
              <svg className="w-5 h-5 text-gray-400 dark:text-gray-600 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <rect x="3" y="11" width="18" height="11" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round"/>
              </svg>
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="flex-1 bg-transparent text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 outline-none"
              />
              <button type="button" onClick={() => setShow(!show)} className="text-gray-400 dark:text-gray-600">
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  {show
                    ? <><path d="M3 12s3.5-7 9-7 9 7 9 7-3.5 7-9 7-9-7-9-7z" strokeLinecap="round"/><circle cx="12" cy="12" r="3"/></>
                    : <path d="M17.94 17.94A10.07 10.07 0 0112 20c-5.5 0-9-7-9-7a17.6 17.6 0 014.06-5.06M9.9 4.24A9.12 9.12 0 0112 4c5.5 0 9 7 9 7a17.6 17.6 0 01-2.06 3.07M3 3l18 18" strokeLinecap="round"/>
                  }
                </svg>
              </button>
            </div>
          </div>
        </div>

        {error && <p className="text-xs text-red-500">{error}</p>}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-4 rounded-lg text-sm font-medium bg-gray-900 text-white hover:bg-black dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white transition-colors disabled:opacity-50"
        >
          {loading ? "Ingresando..." : "Inicia sesión"}
        </button>

        <p className="text-sm text-center text-gray-500 dark:text-gray-400">
          ¿No tienes tu cuenta?{" "}
          <button onClick={onGoToRegister} className="underline font-medium text-gray-800 dark:text-gray-200">
            Ingresa aquí
          </button>
        </p>
      </div>
    </div>
  );
}

function Register({ onGoToLogin, onGoToOnboarding }: RegisterProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    // El registro completo se hace al final del onboarding
    // Aquí solo guardamos email y password en sessionStorage para continuar
    sessionStorage.setItem("reg_email", email);
    sessionStorage.setItem("reg_password", password);
    onGoToOnboarding();
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center px-6">
      <div className="w-full max-w-sm flex flex-col gap-5">

        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Crea tu cuenta</h1>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600 dark:text-gray-400">Correo</label>
            <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-3 bg-white dark:bg-gray-900">
              <svg className="w-5 h-5 text-gray-400 dark:text-gray-600 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M2 7l10 7 10-7" strokeLinecap="round"/>
              </svg>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@address.com"
                className="flex-1 bg-transparent text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600 dark:text-gray-400">Contraseña</label>
            <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-3 bg-white dark:bg-gray-900">
              <svg className="w-5 h-5 text-gray-400 dark:text-gray-600 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <rect x="3" y="11" width="18" height="11" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round"/>
              </svg>
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="flex-1 bg-transparent text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 outline-none"
              />
              <button type="button" onClick={() => setShow(!show)} className="text-gray-400 dark:text-gray-600">
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  {show
                    ? <><path d="M3 12s3.5-7 9-7 9 7 9 7-3.5 7-9 7-9-7-9-7z" strokeLinecap="round"/><circle cx="12" cy="12" r="3"/></>
                    : <path d="M17.94 17.94A10.07 10.07 0 0112 20c-5.5 0-9-7-9-7a17.6 17.6 0 014.06-5.06M9.9 4.24A9.12 9.12 0 0112 4c5.5 0 9 7 9 7a17.6 17.6 0 01-2.06 3.07M3 3l18 18" strokeLinecap="round"/>
                  }
                </svg>
              </button>
            </div>
          </div>
        </div>

        {error && <p className="text-xs text-red-500">{error}</p>}

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full py-4 rounded-lg text-sm font-medium bg-gray-900 text-white hover:bg-black dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white transition-colors disabled:opacity-50"
        >
          {loading ? "Creando cuenta..." : "Crear cuenta"}
        </button>

        <p className="text-xs text-gray-500 dark:text-gray-400">
          By creating an account, you are agree to the{" "}
          <a href="#" className="underline text-gray-700 dark:text-gray-300">Terms of Service</a>{" "}
          and{" "}
          <a href="#" className="underline text-gray-700 dark:text-gray-300">Privacy Policy</a>.
        </p>

        <p className="text-sm text-center text-gray-500 dark:text-gray-400">
          ¿Ya tienes tu cuenta?{" "}
          <button onClick={onGoToLogin} className="underline font-medium text-gray-800 dark:text-gray-200">
            Ingresa aquí
          </button>
        </p>
      </div>
    </div>
  );
}

interface LoginPageProps {
  onGoToOnboarding: () => void;
}

export default function LoginPage({ onGoToOnboarding }: LoginPageProps) {
  const [view, setView] = useState<"login" | "register">("login");
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <button
        onClick={toggleTheme}
        aria-label="Cambiar tema"
        className="fixed top-4 right-4 z-50 p-2.5 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
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
      {view === "login"
        ? <Login onGoToRegister={() => setView("register")} />
        : <Register onGoToLogin={() => setView("login")} onGoToOnboarding={onGoToOnboarding} />}
    </div>
  );
}