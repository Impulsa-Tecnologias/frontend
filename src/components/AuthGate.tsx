import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import LoginPage from "../pages/LoginPage";
import QuestionPage from "../pages/QuestionPage";

type GateView = "login" | "onboarding";

export default function AuthGate({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const [view, setView] = useState<GateView>("login");

    // Si hay sesión activa, muestra el contenido principal
    if (user) return <>{children}</>;

    // Sin sesión, maneja login y onboarding
    if (view === "onboarding") return <QuestionPage />;

    return <LoginPage onGoToOnboarding={() => setView("onboarding")} />;
}