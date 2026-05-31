import './App.css'
import { useState } from 'react'
import LoginPage from './pages/LoginPage'
import QuestionPage from './pages/QuestionPage'

export type AppView = "login" | "onboarding"

export default function App() {
  const [view, setView] = useState<AppView>("login")

  if (view === "onboarding") return <QuestionPage />

  return <LoginPage onGoToOnboarding={() => setView("onboarding")} />
}