
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

  useEffect(() => {
    async function fetchConversions() {
      try {
        const res = await fetch("/api/conversions");
        const json = await res.json();
        setConversions(json.data);
      } catch (error) {
        console.error("Erro ao buscar conversões:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchConversions();
  }, []);

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📋 Conversões Registradas</h1>
      <p className="text-gray-600 mb-6">Veja todos os leads e conversões capturados pela plataforma.</p>

      {loading ? (
        <p>Carregando conversões...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse w-full text-sm">
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
              {conversions.map((conv) => (
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
