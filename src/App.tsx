import './App.css'
import MainLayout from "./layouts/MainLayout"
import AuthGate from "./components/AuthGate"

export default function App() {
  return (
    <AuthGate>
      <MainLayout />
    </AuthGate>
  )
}