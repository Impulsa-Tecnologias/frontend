import { createContext, useContext, useState, type ReactNode } from "react";

type AuthUser = { token: string; email: string; rol: string; allergy: string; kitchenLevel: string } | null;

type AuthContextType = {
  user: AuthUser;
  login: (token: string, email: string, rol: string, allergy: string, kitchenLevel: string) => void;
  logout: () => void;
  updateProfileData: (allergy: string, kitchenLevel: string) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser>(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const rol = localStorage.getItem("rol");
    const allergy = localStorage.getItem("allergy");
    const kitchenLevel = localStorage.getItem("kitchenLevel");
    return token && email && rol ? { token, email, rol, allergy: allergy ?? "", kitchenLevel: kitchenLevel ?? "" } : null;
  });

  function login(token: string, email: string, rol: string, allergy: string, kitchenLevel: string = "") {
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    localStorage.setItem("rol", rol);
    localStorage.setItem("allergy", allergy);
    localStorage.setItem("kitchenLevel", kitchenLevel);
    setUser({ token, email, rol, allergy, kitchenLevel });
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("rol");
    localStorage.removeItem("allergy");
    localStorage.removeItem("kitchenLevel");
    setUser(null);
  }

  function updateProfileData(allergy: string, kitchenLevel: string) {
    if (user) {
      localStorage.setItem("allergy", allergy);
      localStorage.setItem("kitchenLevel", kitchenLevel);
      setUser({ ...user, allergy, kitchenLevel });
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfileData }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}