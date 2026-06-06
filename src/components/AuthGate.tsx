import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import LoginPage from "../pages/LoginPage";
import QuestionPage from "../pages/QuestionPage";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";

type GateView = "login" | "onboarding";

const ADMIN_ROLES = ["ADMIN", "MASTER"];

export default function AuthGate() {
  const { user } = useAuth();
  const [view, setView] = useState<GateView>("login");

  if (user) {
    const isAdmin = ADMIN_ROLES.includes(user.rol?.toUpperCase());
    return isAdmin ? <AdminLayout /> : <MainLayout />;
  }

  if (view === "onboarding") return <QuestionPage />;

  return <LoginPage onGoToOnboarding={() => setView("onboarding")} />;
}