import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { usersApi, type User } from "../api/Users";

type View = "list" | "edit-final" | "edit-admin" | "create";

const Avatar = ({ name }: { name: string }) => (
  <div className="flex flex-col items-center gap-2 mb-6">
    <div className="w-20 h-20 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-500" fill="currentColor" viewBox="0 0 64 64">
        <circle cx="32" cy="22" r="12"/><path d="M8 54c0-13.255 10.745-24 24-24s24 10.745 24 24H8z"/>
      </svg>
    </div>
    <p className="font-bold text-gray-900 dark:text-gray-50">{name}</p>
  </div>
);

const FieldRow = ({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) => (
  <div className="flex items-center gap-3">
    <span className="text-gray-400 shrink-0 w-5">{icon}</span>
    {children}
  </div>
);

const inputCls = "flex-1 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 placeholder-gray-400 outline-none focus:ring-2 focus:ring-gray-300";

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M2 7l10 7 10-7" strokeLinecap="round"/>
  </svg>
);
const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <rect x="3" y="11" width="18" height="11" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round"/>
  </svg>
);
const AlertIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" strokeLinecap="round"/>
  </svg>
);
const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path d="M12 6v6l4 2" strokeLinecap="round"/><circle cx="12" cy="12" r="9"/>
  </svg>
);
const RolIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z" strokeLinecap="round"/>
  </svg>
);

const Buttons = ({ onConfirm, onCancel, confirmLabel, loading }: { onConfirm: () => void; onCancel: () => void; confirmLabel: string; loading?: boolean }) => (
  <div className="flex gap-3 mt-4">
    <button onClick={onConfirm} disabled={loading}
      className="flex-1 py-3 text-sm border border-gray-400 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 cursor-pointer">
      {loading ? "Guardando..." : confirmLabel}
    </button>
    <button onClick={onCancel}
      className="flex-1 py-3 text-sm border border-gray-400 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors cursor-pointer">
      Cancelar
    </button>
  </div>
);

export default function UsersPage() {
  const { user: me } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [view, setView] = useState<View>("list");
  const [selected, setSelected] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Edit final fields
  const [allergy, setAllergy] = useState("");
  const [kitchenLevel, setKitchenLevel] = useState<"BASICO" | "MEDIO" | "ALTO" | "">("");
  const [editPassword, setEditPassword] = useState("");

  // Edit admin fields
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  // Create fields
  const [newRol, setNewRol] = useState("ADMIN");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const isMaster = me?.rol?.toUpperCase() === "MASTER";

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  useEffect(() => {
    usersApi.getAll()
      .then(setUsers)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const handleEdit = (u: User) => {
    setSelected(u);
    setError(""); setSuccess("");
    const isAdmin = ["ADMIN", "MASTER"].includes(u.rol?.toUpperCase());
    if (isAdmin && isMaster) {
      setAdminEmail(u.email); setAdminPassword("");
      setView("edit-admin");
    } else {
      setAllergy(u.allergy ?? "");
      setKitchenLevel((u.kitchenLevel as any) ?? "");
      setEditPassword("");
      setView("edit-final");
    }
  };

  const handleUpdateFinal = async () => {
    if (!selected) return;
    setError(""); setLoading(true);
    try {
      if (editPassword && editPassword.length < 6) {
        setError("La contraseña debe tener al menos 6 caracteres.");
        setLoading(false);
        return;
      }

      const updated = await usersApi.update(selected.id, {
        allergy: allergy || undefined,
        kitchenLevel: kitchenLevel || undefined,
        password: editPassword || undefined,
      });
      setUsers((prev) => prev.map((u) => u.id === updated.id ? updated : u));
      setSuccess("Usuario actualizado."); setView("list");
    } catch (e: any) { setError(e.message); }
    finally { setLoading(false); }
  };

  const handleUpdateAdmin = async () => {
    if (!selected) return;
    setError(""); setLoading(true);
    try {
      if (adminPassword && adminPassword.length < 6) {
        setError("La contraseña debe tener al menos 6 caracteres.");
        setLoading(false);
        return;
      }
      const updated = await usersApi.update(selected.id, {
        password: adminPassword || undefined,
      });
      setUsers((prev) => prev.map((u) => u.id === updated.id ? updated : u));
      setSuccess("Admin actualizado."); setView("list");
    } catch (e: any) { setError(e.message); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar este usuario?")) return;
    try {
      await usersApi.delete(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (e: any) { setError(e.message); }
  };

  const handleCreate = async () => {
    setError("");
    if (!newEmail.trim() || !newPassword.trim()) { setError("Todos los campos son obligatorios."); return; }

    if (!validateEmail(newEmail)) {
      setError("Por favor, ingresa una dirección de correo válida.");
      return;
    }

    if (newPassword.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      setLoading(false);
      return;
    }
    
    setLoading(true);
    try {
      if (newRol === "ADMIN") {
        const created = await usersApi.create({ 
          email: newEmail, 
          password: newPassword, 
          rol: newRol as "ADMIN"
        });
        setUsers((prev) => [...prev, created]);
      } else {
        const created = await usersApi.create({
          email: newEmail,
          password: newPassword,
          rol: newRol as "FINAL",
          allergy: "sin alergias",
          kitchenLevel: "BASICO",
        });
        setUsers((prev) => [...prev, created]);
      }

      setSuccess("Usuario creado exitosamente."); 
      setNewEmail(""); setNewPassword(""); setView("list");
    } catch (e: any) { setError(e.message); }
    finally { setLoading(false); }
  };

  // Editar usuario FINAL
  if (view === "edit-final" && selected) return (
    <div className="max-w-sm mx-auto flex flex-col gap-5">
      <Avatar name={selected.email} />
      <FieldRow icon={<AlertIcon />}>
        <input type="text" value={allergy} onChange={(e) => setAllergy(e.target.value)}
          placeholder="Alergias" className={inputCls}/>
      </FieldRow>
      <FieldRow icon={<ClockIcon />}>
        <select value={kitchenLevel} onChange={(e) => setKitchenLevel(e.target.value as any)}
          className={inputCls}>
          <option value="">Nivel de cocina</option>
          <option value="BASICO">Básico</option>
          <option value="MEDIO">Medio</option>
          <option value="ALTO">Alto</option>
        </select>
      </FieldRow>
      <FieldRow icon={<LockIcon />}>
        <input type="password" value={editPassword} onChange={(e) => setEditPassword(e.target.value)}
          placeholder="Contraseña" className={inputCls} minLength={6}/>
      </FieldRow>
      {error && <p className="text-xs text-red-500">{error}</p>}
      <Buttons onConfirm={handleUpdateFinal} onCancel={() => setView("list")} confirmLabel="Actualizar" loading={loading}/>
    </div>
  );

  // Editar usuario ADMIN (solo MASTER)
  if (view === "edit-admin" && selected) return (
    <div className="max-w-sm mx-auto flex flex-col gap-5">
      <Avatar name="Administrador" />
      <FieldRow icon={<MailIcon />}>
        <input type="email" value={adminEmail} readOnly
          placeholder="Email" className={`${inputCls} bg-gray-50 dark:bg-gray-800 cursor-default`}/>
      </FieldRow>
      <FieldRow icon={<LockIcon />}>
        <input type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)}
          placeholder="Contraseña" className={inputCls} minLength={6}/>
      </FieldRow>
      {error && <p className="text-xs text-red-500">{error}</p>}
      <Buttons onConfirm={handleUpdateAdmin} onCancel={() => setView("list")} confirmLabel="Actualizar" loading={loading}/>
    </div>
  );

  // Crear usuario (solo MASTER)
  if (view === "create") return (
    <div className="max-w-sm mx-auto flex flex-col gap-5">
      <Avatar name="Administrador" />
      <FieldRow icon={<RolIcon />}>
        <select value={newRol} onChange={(e) => setNewRol(e.target.value)} className={inputCls}>
          {isMaster && <option value="ADMIN">Admin</option>}
          <option value="FINAL">Usuario Final</option>
        </select>
      </FieldRow>
      <FieldRow icon={<MailIcon />}>
        <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)}
          placeholder="Email" className={inputCls}/>
      </FieldRow>
      <FieldRow icon={<LockIcon />}>
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Contraseña" className={inputCls} minLength={6}/>
      </FieldRow>
      {error && <p className="text-xs text-red-500">{error}</p>}
      <Buttons onConfirm={handleCreate} onCancel={() => setView("list")} confirmLabel="Crear" loading={loading}/>
    </div>
  );

  // Lista de usuarios
  return (
    <div className="max-w-lg mx-auto flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-50">Usuarios</h1>

      <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-full px-4 py-2 bg-white dark:bg-gray-900">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35" strokeLinecap="round"/>
        </svg>
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          className="flex-1 bg-transparent text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 outline-none"/>
      </div>

      {loading && <p className="text-sm text-center text-gray-400">Cargando usuarios...</p>}
      {error && <p className="text-sm text-center text-red-500">{error}</p>}
      {success && <p className="text-sm text-center text-green-500">{success}</p>}

      <div className="flex flex-col divide-y divide-gray-300 dark:divide-gray-800">
        {users
          .filter((u) => u.email.toLowerCase().includes(search.toLowerCase()))
          .map((u) => (
            <div key={u.id} className="flex items-center justify-between py-3 hover:bg-gray-200 dark:hover:bg-gray-800 p-2">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800 dark:text-gray-200 truncate">{u.email}</p>
                <p className="text-xs text-gray-400">{u.rol}</p>
              </div>
              <div className="flex items-center gap-3 ml-2">
                <button onClick={() => handleEdit(u)} className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" strokeLinecap="round"/>
                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                </button>
                <button onClick={() => handleDelete(u.id)} className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        {!loading && users.length === 0 && (
          <p className="text-sm text-center text-gray-400 py-6">No hay usuarios.</p>
        )}
      </div>

      {["ADMIN", "MASTER"].includes(me?.rol?.toUpperCase() || "") && (
        <div className="flex justify-end mt-4">
          <button onClick={() => { setError(""); setView("create"); setNewRol(isMaster ? "ADMIN" : "FINAL"); }}
            className="p-3 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <rect x="2" y="2" width="20" height="20" rx="3"/><path d="M12 8v8M8 12h8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}