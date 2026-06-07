import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { usersApi } from "../api/Users";

type View = "perfil" | "password";

export default function AdminProfilePage() {
  const { user } = useAuth();
  const [view, setView] = useState<View>("perfil");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const Avatar = () => (
    <div className="flex flex-col items-center gap-2 mb-6">
      <div className="w-20 h-20 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-500" fill="currentColor" viewBox="0 0 64 64">
          <circle cx="32" cy="22" r="12"/><path d="M8 54c0-13.255 10.745-24 24-24s24 10.745 24 24H8z"/>
        </svg>
      </div>
    </div>
  );

  const handleUpdatePassword = async () => {
    setError(""); setSuccess("");
    if (!newPassword || !confirmPassword) { setError("Todos los campos son obligatorios."); return; }
    if (newPassword !== confirmPassword) { setError("Las contraseñas no coinciden."); return; }
    setLoading(true);
    try {
      await usersApi.updateProfile({ password: newPassword });
      setSuccess("Contraseña actualizada.");
      setNewPassword(""); setConfirmPassword("");
      setView("perfil");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  if (view === "password") return (
    <div className="max-w-sm mx-auto flex flex-col gap-5">
      <Avatar />

      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600 dark:text-gray-400">Contraseña</label>
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Contraseña"
          className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 placeholder-gray-400 outline-none focus:ring-2 focus:ring-gray-300"/>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-600 dark:text-gray-400">Nueva contraseña</label>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Contraseña"
          className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 placeholder-gray-400 outline-none focus:ring-2 focus:ring-gray-300"/>
        <input type="password"
          placeholder="Contraseña"
          className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 placeholder-gray-400 outline-none focus:ring-2 focus:ring-gray-300"/>
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}
      {success && <p className="text-xs text-green-500">{success}</p>}

      <div className="flex gap-3">
        <button onClick={handleUpdatePassword} disabled={loading}
          className="flex-1 py-3 text-sm border border-gray-400 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50">
          {loading ? "Guardando..." : "Actualizar"}
        </button>
        <button onClick={() => setView("perfil")}
          className="flex-1 py-3 text-sm border border-gray-400 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          Cancelar
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-sm mx-auto flex flex-col gap-5">
      <Avatar />

      <div className="flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M2 7l10 7 10-7" strokeLinecap="round"/>
        </svg>
        <input readOnly value={user?.email ?? ""}
          className="flex-1 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 text-gray-500 outline-none cursor-default"/>
      </div>

      <div className="flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path d="M3 17l3-8 5 5 4-8 3 8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 17h18M3 20h18" strokeLinecap="round"/>
        </svg>
        <input readOnly value={user?.rol ?? ""}
          className="flex-1 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-500 outline-none cursor-default"/>
      </div>

      {success && <p className="text-xs text-green-500">{success}</p>}

      <button onClick={() => setView("password")}
        className="w-full py-3 text-sm border border-gray-400 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
        Cambiar contraseña
      </button>
    </div>
  );
}