import { useState, useEffect } from "react";
import { recipesApi, type Recipe } from "../api/Recipes";
import ReactMarkdown from "react-markdown";

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    recipesApi.getAll()
      .then(setRecipes)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await recipesApi.delete(id);
      setRecipes((prev) => prev.filter((r) => r.id !== id));
      setSelected(null);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const formatearTextoReceta = (textoCrudo: string) => {
    if (!textoCrudo) return "";

    let textoProcesado = textoCrudo;
    textoProcesado = textoProcesado.replace(/Ingredientes:\s*/gi, "### 🛒 Ingredientes\n");
    textoProcesado = textoProcesado.replace(/(Pasos:|Preparación:)\s*/gi, "\n\n---\n\n### 🍳 Preparación\n");

    if (textoProcesado.includes("### 🛒 Ingredientes") && textoProcesado.includes("### 🍳 Preparación")) {
      const partes = textoProcesado.split("### 🍳 Preparación");
      const listaIngredientes = partes[0]
        .replace("### 🛒 Ingredientes\n", "")
        .split(",")
        .map(ing => `* ${ing.trim()}`)
        .join("\n");
      textoProcesado = `### 🛒 Ingredientes\n${listaIngredientes}\n\n### 🍳 Preparación${partes[1]}`;
    }

    textoProcesado = textoProcesado.replace(/\s(\d+\.)\s/g, "\n$1 -> ");
    textoProcesado = textoProcesado.replace(/en la mesa de \[ADDRESS\]/gi, "en la mesa").replace(/\[ADDRESS\]/gi, "");

    return textoProcesado;
  };

  const filtered = recipes.filter((r) =>
    r.recipeTitle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-lg mx-auto flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-50">Mis recetas</h1>

      <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-full px-4 py-2 bg-white dark:bg-gray-900">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35" strokeLinecap="round"/>
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          className="flex-1 bg-transparent text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 outline-none"
        />
      </div>

      {loading && <p className="text-sm text-center text-gray-400">Cargando recetas...</p>}
      {error && <p className="text-sm text-center text-red-500">{error}</p>}

      <div className="flex flex-col divide-y divide-gray-300 dark:divide-gray-800">
        {filtered.map((recipe) => (
          <div key={recipe.id} className="flex items-center justify-between py-3 hover:bg-gray-200 dark:hover:bg-gray-800 p-2">
            <span className="text-sm text-gray-800 dark:text-gray-200">{recipe.recipeTitle}</span>
            <button onClick={() => setSelected(recipe)} className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 transition-colors cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeLinecap="round"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </button>
          </div>
        ))}
        {!loading && filtered.length === 0 && (
          <p className="text-sm text-center text-gray-400 py-6">No tienes recetas guardadas.</p>
        )}
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-md p-5 flex flex-col gap-4 max-h-[85vh]">

            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 border-b border-gray-100 dark:border-gray-800 pb-3">
              {selected.recipeTitle}
            </h2>

            <div className="overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 flex-1">
              <div className="text-sm text-gray-600 dark:text-gray-400 prose dark:prose-invert max-w-none">
                <ReactMarkdown>
                  {formatearTextoReceta(selected.recipeContent)}
                </ReactMarkdown>
              </div>
            </div>

            <div className="flex justify-between mt-2 pt-3 border-t border-gray-100 dark:border-gray-800">
              <button 
                onClick={() => setSelected(null)} 
                className="p-2.5 rounded-full border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                title="Cerrar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6" strokeLinecap="round"/>
                </svg>
              </button>

              <button 
                onClick={() => handleDelete(selected.id)} 
                className="p-2.5 rounded-full border border-red-300 dark:border-red-700 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer"
                title="Eliminar receta"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/>
                </svg>
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}