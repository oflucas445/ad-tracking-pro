import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Stat {
  date: string;
  clicks: number;
  conversions: number;
}

export default function Dashboard() {
  const [data, setData] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/aggregate");
        const json = await res.json();
        setData(json.data);
      } catch (err) {
        console.error("Erro ao buscar dados do dashboard:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📈 Dashboard Global</h1>
      <p className="text-gray-600 mb-8">
        Acompanhe o desempenho diário dos seus links com dados reais da API.
      </p>

      {loading ? (
        <p>Carregando dados...</p>
      ) : (
        <div className="bg-white p-4 rounded shadow border">
          <h2 className="text-lg font-semibold mb-4">🔎 Cliques vs Conversões</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="clicks" stroke="#3182ce" name="Cliques" />
              <Line type="monotone" dataKey="conversions" stroke="#38a169" name="Conversões" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </main>
  );
}
