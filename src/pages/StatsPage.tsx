import { useState, useEffect } from "react";
import { statsApi, type OpenRouterStats, type SystemMetrics } from "../api/stats";

export default function StatsPage() {
  const [openRouterData, setOpenRouterData] = useState<OpenRouterStats | null>(null);
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      statsApi.getIaUsage(),
      statsApi.getSystemMetrics(),
    ])
      .then(([iaData, systemData]) => {
        setOpenRouterData(iaData);
        setSystemMetrics(systemData);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <p className="text-sm text-gray-400 animate-pulse">Cargando métricas reales...</p>
      </div>
    );
  }

  const usageUsd = openRouterData?.data?.usage ?? 0;
  const limitUsd = openRouterData?.data?.limit ?? 10.00;
  const percentConsumed = Math.min((usageUsd / limitUsd) * 100, 100);

  return (
    <div className="max-w-3xl mx-auto px-4 flex flex-col gap-6 pb-10">
      {/* Encabezado */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Panel de Control</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Monitoreo global de bases de datos e Inteligencia Artificial.</p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-xs text-red-500">
          Error al sincronizar telemetría: {error}
        </div>
      )}

      {/* 📊 KPIs: Contadores Reales de PostgreSQL */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 rounded-xl shadow-sm">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Usuarios Totales</p>
          <p className="text-2xl font-black text-gray-900 dark:text-gray-50 mt-1">
            {systemMetrics?.totalUsers ?? 0}
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 rounded-xl shadow-sm">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Chats Creados</p>
          <p className="text-2xl font-black text-gray-900 dark:text-gray-50 mt-1">
            {systemMetrics?.activeChats ?? 0}
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 rounded-xl shadow-sm">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Recetas Guardadas</p>
          <p className="text-2xl font-black text-gray-900 dark:text-gray-50 mt-1">
            {systemMetrics?.savedRecipes ?? 0}
          </p>
        </div>
      </div>

      {/* 🚀 Gráfica de Presupuesto y Consumo de OpenRouter */}
      <div className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm flex flex-col gap-5">
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wider">Presupuesto de Inteligencia Artificial</h2>
            <span className={`px-2 py-0.5 rounded-full text-2xs font-bold ${openRouterData?.data?.is_active ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : 'bg-red-100 text-red-600'}`}>
              {openRouterData?.data?.is_active ? "CONECTADO" : "INACTIVO"}
            </span>
          </div>
          <p className="text-xs text-gray-400">
            Identificador de API Key: <span className="font-mono bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-gray-600 dark:text-gray-300">{openRouterData?.data?.label || "Key-Default"}</span>
          </p>
        </div>

        {/* Cifras Financieras */}
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-black text-gray-900 dark:text-gray-50">${usageUsd.toFixed(4)}</span>
          <span className="text-sm text-gray-400 font-medium">USD consumidos de un límite de ${limitUsd.toFixed(2)} USD</span>
        </div>

        {/* Barra de progreso fluida */}
        <div className="w-full">
          <div className="flex justify-between text-xs text-gray-500 mb-1.5 font-medium">
            <span>Uso general de la API</span>
            <span>{percentConsumed.toFixed(2)}%</span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-800 h-3 rounded-full overflow-hidden">
            <div 
              className="bg-amber-500 h-full rounded-full transition-all duration-1000"
              style={{ width: `${percentConsumed}%` }}
            />
          </div>
        </div>
      </div>

    </div>
  );
}