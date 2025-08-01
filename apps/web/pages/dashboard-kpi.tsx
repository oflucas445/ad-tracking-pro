
import { useEffect, useState } from "react";

interface GlobalStats {
  total_clicks: number;
  total_conversions: number;
  conversion_rate: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<GlobalStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/stats");
        const json = await res.json();
        setStats(json);
      } catch (error) {
        console.error("Erro ao buscar KPIs globais:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">📊 KPIs Globais</h1>

      {loading ? (
        <p>Carregando estatísticas...</p>
      ) : (
        stats && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <div className="bg-white rounded shadow p-6 border text-center">
              <h2 className="text-xl font-semibold text-blue-700">Total de Cliques</h2>
              <p className="text-3xl font-bold mt-2">{stats.total_clicks}</p>
            </div>
            <div className="bg-white rounded shadow p-6 border text-center">
              <h2 className="text-xl font-semibold text-green-700">Conversões</h2>
              <p className="text-3xl font-bold mt-2">{stats.total_conversions}</p>
            </div>
            <div className="bg-white rounded shadow p-6 border text-center">
              <h2 className="text-xl font-semibold text-purple-700">Taxa de Conversão</h2>
              <p className="text-3xl font-bold mt-2">{stats.conversion_rate.toFixed(2)}%</p>
            </div>
          </div>
        )
      )}
    </main>
  );
}
