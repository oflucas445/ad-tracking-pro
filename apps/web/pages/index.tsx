import { useEffect, useState } from "react";

export default function Home() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/links`);
        if (!res.ok) throw new Error("Erro ao buscar links da API");
        const data = await res.json();
        setLinks(data);
      } catch (err: any) {
        setError(err.message || "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">Meus Links de Tracking</h1>

      {loading && <p className="text-gray-500">Carregando links...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {links.map((link: any) => (
        <div key={link.id} className="border p-4 mb-2 rounded">
          <p><strong>{link.name}</strong></p>
          <p>
            <a
              href={`${process.env.NEXT_PUBLIC_API_URL}/clicks/${link.id}`}
              className="text-blue-600 underline"
              target="_blank"
            >
              Link de Redirecionamento
            </a>
          </p>
        </div>
      ))}
    </main>
  );
}
