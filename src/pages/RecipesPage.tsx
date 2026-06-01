import { useState } from "react";

type Recipe = { id: number; title: string; content: string };

const mockRecipes: Recipe[] = [
  { id: 1, title: "Título de la receta 1", content: "Esta es una receta detallada con ingredientes y pasos para preparar un delicioso plato. Incluye instrucciones paso a paso y tiempos de cocción." },
  { id: 2, title: "Título de la receta 2", content: "Receta tradicional con ingredientes frescos y naturales. Tiempo de preparación 30 minutos. Porciones para 4 personas." },
  { id: 3, title: "Título de la receta 3", content: "Una receta saludable y nutritiva ideal para el desayuno. Fácil de preparar y con ingredientes que encontrarás en cualquier supermercado." },
  { id: 4, title: "Título de la receta 4", content: "Receta especial para ocasiones especiales. Con técnicas de cocina avanzadas y presentación gourmet. Perfecta para impresionar a tus invitados." },
];

export default function RecipesPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Recipe | null>(null);

  const filtered = mockRecipes.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-lg mx-auto flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-50">Mis recetas</h1>

      {/* Search */}
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

      {/* Lista */}
      <div className="flex flex-col divide-y divide-gray-100 dark:divide-gray-800">
        {filtered.map((recipe) => (
          <div key={recipe.id} className="flex items-center justify-between py-3">
            <span className="text-sm text-gray-800 dark:text-gray-200">{recipe.title}</span>
            <button onClick={() => setSelected(recipe)} className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeLinecap="round"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Modal de receta */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/30">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg w-full max-w-sm p-5 flex flex-col gap-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-50">{selected.title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{selected.content}</p>
            <div className="flex justify-between mt-2">
              <button onClick={() => setSelected(null)} className="p-2 rounded-full border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6" strokeLinecap="round"/>
                </svg>
              </button>
              <button className="p-2 rounded-full border border-red-300 dark:border-red-700 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
