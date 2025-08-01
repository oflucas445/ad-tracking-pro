import { useState } from "react";

export default function Dashboard() {
  const [linkId, setLinkId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    if (!linkId) {
      setError("Insira o ID do link.");
      return;
    }
    setError(null);
    setLoading(true);

    let url = `${process.env.NEXT_PUBLIC_API_URL}/stats/link/${linkId}`;
    const params = new URLSearchParams();
    if (startDate) params.append("start_date", startDate);
    if (endDate) params.append("end_date", endDate);
    if (params.toString()) url += `?${params.toString()}`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Erro ao buscar estatísticas.");
      const data = await res.json();
      setStats(data);
    } catch (err: any) {
      setError(err.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">Estatísticas por Link</h1>

      <div className="mb-4 flex flex-col gap-2 max-w-md">
        <input
          className="border p-2"
          type="text"
          placeholder="ID do Link"
          value={linkId}
          onChange={(e) => setLinkId(e.target.value)}
        />
        <input
          className="border p-2"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          className="border p-2"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button
          onClick={fetchStats}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Buscar Estatísticas
        </button>
      </div>

      {loading && <p className="text-gray-500">Carregando...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {stats && (
        <div className="border p-4 rounded bg-gray-50 max-w-md">
          <p><strong>Link ID:</strong> {stats.link_id}</p>
          <p><strong>Total de Cliques:</strong> {stats.clicks}</p>
          <p><strong>Total de Conversões:</strong> {stats.conversions}</p>
          <p><strong>Valor Total:</strong> R$ {stats.total_value}</p>
          <p><strong>Taxa de Conversão:</strong> {stats.conversion_rate}%</p>
        </div>
      )}
    </main>
  );
}
