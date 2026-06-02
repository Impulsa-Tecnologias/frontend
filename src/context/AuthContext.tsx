import { createContext, useContext, useState, type ReactNode } from "react";

type AuthUser = { token: string; email: string; rol: string } | null;

type AuthContextType = {
    user: AuthUser;
    login: (token: string, email: string, rol: string) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {

    // Persistencia: carga token de localStorage al iniciar
    const [user, setUser] = useState<AuthUser>(() => {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");
        const rol = localStorage.getItem("rol");
        return token && email && rol ? { token, email, rol } : null;
    });
    function login(token: string, email: string, rol: string) {
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
        localStorage.setItem("rol", rol);
        setUser({ token, email, rol });
    }
    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("rol");
        setUser(null);
    }
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
        {children}
        </AuthContext.Provider>
    );

}
// Hook de acceso rápido
export function useAuth() {

    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be inside AuthProvider");
    return ctx;

}