export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8082";

export async function http<T>(path: string, options?: RequestInit): Promise<T> {

    // Lee el token guardado
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}${path}`, {
        headers: {
            "Content-Type": "application/json",
            // Agrega el header solo si existe token
            ...(token ? { "Authorization": `Bearer ${token}` } : {}),
            ...(options?.headers ?? {}),
        },
        ...options,
    });

    // Si el servidor responde 401, el token expiró → limpiar sesión
    if (res.status === 401 && !path.includes("/api/v1/auth/login")) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        window.location.href = "/login";
        throw new Error("Sesión expirada");
    }

    if (res.status === 403 && path.includes("/api/v1/users/password")) {
        throw new Error("La contraseña actual es incorrecta.");
    }

    if (res.status === 403 && path.includes("/api/v1/users")) {
        throw new Error("La dirección de correo ya está en uso.");
    }

    if (!res.ok) {
        try {
            const errorData = await res.json();
            
            throw new Error(errorData.message || "Ocurrió un error inesperado.");
        } catch (e: any) {

            if (res.status === 401) {
                throw new Error("El correo o la contraseña son incorrectos.");
            }

            if (res.status === 403) {
                localStorage.removeItem("token");
                localStorage.removeItem("username");
                window.location.href = "/login";
                throw new Error("Sesión expirada");
            }

            throw new Error(e.message || `Error del servidor (HTTP ${res.status})`);
        }
    }

    if (res.status === 204) return undefined as T;
    return res.json() as Promise<T>;
}