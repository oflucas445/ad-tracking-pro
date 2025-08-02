
import { useEffect, useState } from "react";

interface Conversion {
  id: number;
  link_id: number;
  timestamp: string;
  email?: string;
  phone?: string;
  produto?: string;
  utm_campaign?: string;
  utm_content?: string;
}

export default function ConversionPanel() {
  const [conversions, setConversions] = useState<Conversion[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchConversions();
  }, []);

  const fetchConversions = async () => {
    try {
      const res = await fetch("/api/conversions");
      const json = await res.json();
      setConversions(json.data);
    } catch (error) {
      console.error("Erro ao buscar conversões:", error);
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    const headers = [
      "ID",
      "Link ID",
      "Timestamp",
      "Email",
      "Telefone",
      "Produto",
      "UTM Campaign",
      "UTM Content"
    ];

    const rows = conversions.map(conv => [
      conv.id,
      conv.link_id,
      conv.timestamp,
      conv.email || "",
      conv.phone || "",
      conv.produto || "",
      conv.utm_campaign || "",
      conv.utm_content || ""
    ]);

    const csv = [headers, ...rows].map(row => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "conversions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = conversions.filter(conv =>
    conv.email?.toLowerCase().includes(search.toLowerCase()) ||
    conv.produto?.toLowerCase().includes(search.toLowerCase()) ||
    conv.utm_campaign?.toLowerCase().includes(search.toLowerCase()) ||
    conv.utm_content?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📋 Conversões Detalhadas</h1>

      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="🔍 Filtrar por email, produto, UTM..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full sm:w-96"
        />
        <button
          onClick={exportToCSV}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Exportar CSV
        </button>
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className="overflow-x-auto text-sm">
          <table className="table-auto border-collapse w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">ID</th>
                <th className="border p-2">Link</th>
                <th className="border p-2">Data</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Telefone</th>
                <th className="border p-2">Produto</th>
                <th className="border p-2">UTM Campaign</th>
                <th className="border p-2">UTM Content</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((conv) => (
                <tr key={conv.id}>
                  <td className="border p-2 text-center">{conv.id}</td>
                  <td className="border p-2 text-center">{conv.link_id}</td>
                  <td className="border p-2 text-center">{new Date(conv.timestamp).toLocaleString()}</td>
                  <td className="border p-2 text-center">{conv.email || "-"}</td>
                  <td className="border p-2 text-center">{conv.phone || "-"}</td>
                  <td className="border p-2 text-center">{conv.produto || "-"}</td>
                  <td className="border p-2 text-center">{conv.utm_campaign || "-"}</td>
                  <td className="border p-2 text-center">{conv.utm_content || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
