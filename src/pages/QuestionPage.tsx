import { useState } from "react";
import { useTheme } from "../hook/ThemeProvider";
import { authApi } from "../api/auth";
import { useAuth } from "../context/AuthContext";

interface StepProps {
  onNext: () => void;
  onBack?: () => void;
}

const ArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 8l4 4-4 4M8 12h8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrowLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 16l-4-4 4-4M16 12H8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Step 1 - Bienvenido
function Step1({ onNext }: StepProps) {
  return (
    <div className="flex flex-col items-center text-center gap-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mt-4">Bienvenido</h1>
      <div>
        <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm">Queremos conocerte más</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Para ello queremos hacerte las siguientes preguntas.</p>
      </div>
      <button onClick={onNext} className="mt-2 p-3 rounded-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:opacity-80 transition-opacity">
        <ArrowRight />
      </button>
    </div>
  );
}

// Step 2 - Alergia
interface Step2Props {
  onNext: (alergy: string) => void;
  onBack: () => void;
}
function Step2({ onNext, onBack }: Step2Props) {
  const [alergico, setAlergico] = useState<"si" | "no" | null>(null);
  const [cual, setCual] = useState("");
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!alergico) { setError("Selecciona una opción."); return; }
    if (alergico === "si" && !cual.trim()) { setError("Escribe a qué eres alérgico."); return; }
    setError("");
    onNext(alergico === "si" ? cual.trim() : "ninguna");
  };

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-lg font-semibold text-center text-gray-900 dark:text-gray-50">¿Es alérgico alguna comida?</h2>

      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" name="alergico" checked={alergico === "si"} onChange={() => { setAlergico("si"); setError(""); }}
            className="accent-gray-900 dark:accent-gray-100 w-4 h-4"/>
          <span className="text-sm text-gray-800 dark:text-gray-200">Sí</span>
        </label>

        {alergico === "si" && (
          <div className="ml-6">
            <input
              type="text"
              value={cual}
              onChange={(e) => { setCual(e.target.value); setError(""); }}
              placeholder="¿Cuál?"
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600"
            />
<p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">Nota: escribe las alergias separadas por espacios. Ej: Maní pasas nueces</p>
          </div>
        )}

        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" name="alergico" checked={alergico === "no"} onChange={() => { setAlergico("no"); setCual(""); setError(""); }}
            className="accent-gray-900 dark:accent-gray-100 w-4 h-4"/>
          <span className="text-sm text-gray-800 dark:text-gray-200">No</span>
        </label>
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      <div className="flex justify-between mt-2">
        <button onClick={onBack} className="p-3 rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <ArrowLeft />
        </button>
        <button onClick={handleNext} className="p-3 rounded-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:opacity-80 transition-opacity">
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}

// Step 3 - Nivel de cocina
interface Step3Props {
  onNext: (level: "BASICO" | "MEDIO" | "ALTO") => void;
  onBack: () => void;
}
function Step3({ onNext, onBack }: Step3Props) {
  const [nivel, setNivel] = useState<"BASICO" | "MEDIO" | "ALTO" | null>(null);
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!nivel) { setError("Selecciona tu nivel de cocina."); return; }
    setError("");
    onNext(nivel);
  };

  const opciones: { label: string; value: "BASICO" | "MEDIO" | "ALTO" }[] = [
    { label: "Básico", value: "BASICO" },
    { label: "Media", value: "MEDIO" },
    { label: "Avanzado", value: "ALTO" },
  ];

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-lg font-semibold text-center text-gray-900 dark:text-gray-50">¿Nivel de cocina?</h2>

      <div className="flex flex-col gap-3">
        {opciones.map((op) => (
          <label key={op.value} className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="nivel" checked={nivel === op.value} onChange={() => { setNivel(op.value); setError(""); }}
              className="accent-gray-900 dark:accent-gray-100 w-4 h-4"/>
            <span className="text-sm text-gray-800 dark:text-gray-200">{op.label}</span>
          </label>
        ))}
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      <div className="flex justify-between mt-2">
        <button onClick={onBack} className="p-3 rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <ArrowLeft />
        </button>
        <button onClick={handleNext} className="p-3 rounded-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:opacity-80 transition-opacity">
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}

// Step 4 - Gracias
interface Step4Props {
  onBack: () => void;
  loading: boolean;
  error: string;
}
function Step4({ onBack, loading, error }: Step4Props) {
  return (
    <div className="flex flex-col items-center text-center gap-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mt-4">Gracias por tu colaboración</h1>
      {error && <p className="text-xs text-red-500">{error}</p>}
      {loading && <p className="text-sm text-gray-500 dark:text-gray-400">Creando tu cuenta...</p>}
      <div className="flex justify-between w-full mt-2">
        <button onClick={onBack} disabled={loading} className="p-3 rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50">
          <ArrowLeft />
        </button>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [allergy, setAllergy] = useState("");
  const [kitchenLevel, setKitchenLevel] = useState<"BASICO" | "MEDIO" | "ALTO">("BASICO");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { theme, toggleTheme } = useTheme();
  const { login } = useAuth();

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  const handleStep2Next = (alergy: string) => {
    setAllergy(alergy);
    next();
  };

  const handleStep3Next = async (level: "BASICO" | "MEDIO" | "ALTO") => {
    setKitchenLevel(level);
    setError("");
    setLoading(true);
    next(); // Avanza al step 4 (gracias) mientras registra

    const email = sessionStorage.getItem("reg_email") ?? "";
    const password = sessionStorage.getItem("reg_password") ?? "";

    try {
      const res = await authApi.register({ email, password, allergy, kitchenLevel: level });
      sessionStorage.removeItem("reg_email");
      sessionStorage.removeItem("reg_password");
      login(res.token, res.email, res.rol, res.allergy ?? "", res.kitchenLevel ?? "");
    } catch (e: any) {
      setError(e.message || "Error al crear la cuenta.");
      setStep(3); // Se queda en gracias mostrando el error
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    <Step1 onNext={next} />,
    <Step2 onNext={handleStep2Next} onBack={back} />,
    <Step3 onNext={handleStep3Next} onBack={back} />,
    <Step4 onBack={back} loading={loading} error={error} />,
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex items-center justify-center px-4 transition-colors duration-300">
      <button
        onClick={toggleTheme}
        aria-label="Cambiar tema"
        className="fixed top-4 right-4 z-50 p-2.5 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        {theme === "dark" ? (
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <circle cx="12" cy="12" r="4"/>
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 w-full max-w-sm p-8 transition-colors duration-300">
        <div className="flex justify-center gap-2 mb-6">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? "w-6 bg-gray-900 dark:bg-gray-100" : "w-1.5 bg-gray-300 dark:bg-gray-700"}`} />
          ))}
        </div>
        {steps[step]}
      </div>
    </div>
  );
}