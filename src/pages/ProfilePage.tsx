import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { usersApi } from "../api/Users";

type View = "perfil" | "info" | "password";

export default function ProfilePage() {
  const { user } = useAuth();
  const [view, setView] = useState<View>("perfil");
  const [allergy, setAllergy] = useState("");
  const [kitchenLevel, setKitchenLevel] = useState<"BASICO" | "MEDIO" | "ALTO" | "">("BASICO");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const Avatar = () => (
    <div className="flex flex-col items-center gap-2 mb-4">
      <div className="w-20 h-20 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-500" fill="currentColor" viewBox="0 0 64 64">
          <circle cx="32" cy="22" r="12"/><path d="M8 54c0-13.255 10.745-24 24-24s24 10.745 24 24H8z"/>
        </svg>
      </div>
      <p className="font-bold text-gray-900 dark:text-gray-50">{user?.email ?? "Email"}</p>
    </div>
  );

  const handleUpdateProfile = async () => {
    setError(""); setSuccess("");
    setLoading(true);
    try {
      await usersApi.updateProfile({ allergy, kitchenLevel });
      setSuccess("Información actualizada.");
      setView("perfil");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    setError(""); setSuccess("");
    if (!newPassword || !confirmPassword) { setError("Todos los campos son obligatorios."); return; }
    if (newPassword !== confirmPassword) { setError("Las contraseñas no coinciden."); return; }
    setLoading(true);
    try {
      await usersApi.updateProfile({ password: newPassword });
      setSuccess("Contraseña actualizada.");
      setPassword(""); setNewPassword(""); setConfirmPassword("");
      setView("perfil");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  if (view === "info") return (
    <div className="max-w-sm mx-auto flex flex-col gap-5">
      <Avatar />

<p className="text-xs text-yellow-700 dark:text-yellow-300">Nota: escribe las alergias separadas por espacios. Ej: Maní pasas nueces</p>

      <div className="flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" strokeLinecap="round"/>
        </svg>
        <input type="text" value={allergy} onChange={(e) => setAllergy(e.target.value)}
          placeholder="Alergias (separadas por comas)"
          className="flex-1 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 placeholder-gray-400 outline-none focus:ring-2 focus:ring-gray-300"/>
      </div>

      <div className="flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path d="M12 6v6l4 2" strokeLinecap="round"/><circle cx="12" cy="12" r="9"/>
        </svg>
        <select value={kitchenLevel} onChange={(e) => setKitchenLevel(e.target.value as "BASICO" | "MEDIO" | "ALTO")}
          className="flex-1 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 outline-none">
          <option value="BASICO">Básico</option>
          <option value="MEDIO">Medio</option>
          <option value="ALTO">Alto</option>
        </select>
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}
      {success && <p className="text-xs text-green-500">{success}</p>}

      <div className="flex gap-3">
        <button onClick={handleUpdateProfile} disabled={loading}
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

  if (view === "password") return (
    <div className="max-w-sm mx-auto flex flex-col gap-5">
      <Avatar />

      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600 dark:text-gray-400">Contraseña actual</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña actual"
          className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 placeholder-gray-400 outline-none focus:ring-2 focus:ring-gray-300"/>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-600 dark:text-gray-400">Nueva contraseña</label>
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Nueva contraseña"
          className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 placeholder-gray-400 outline-none focus:ring-2 focus:ring-gray-300"/>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirmar contraseña"
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
          <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" strokeLinecap="round"/>
        </svg>
        <input readOnly value={allergy || "Alergias"}
          className="flex-1 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 text-gray-500 placeholder-gray-400 outline-none cursor-default"/>
      </div>

      <div className="flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path d="M12 6v6l4 2" strokeLinecap="round"/><circle cx="12" cy="12" r="9"/>
        </svg>
        <input readOnly value={kitchenLevel || "Nivel de cocina"}
          className="flex-1 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-500 outline-none cursor-default"/>
      </div>

      {success && <p className="text-xs text-green-500">{success}</p>}

      <div className="flex gap-3">
        <button onClick={() => setView("info")}
          className="flex-1 py-3 text-sm border border-gray-400 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          Actualizar información
        </button>
        <button onClick={() => setView("password")}
          className="flex-1 py-3 text-sm border border-gray-400 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          Cambiar contraseña
        </button>
      </div>
    </div>
  );
}