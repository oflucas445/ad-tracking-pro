import { useState } from "react";

export default function CreateLink() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [created, setCreated] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!name || name.length < 3) {
      setMessage("Nome deve ter ao menos 3 caracteres.");
      return false;
    }
    if (!url || !url.startsWith("http")) {
      setMessage("A URL deve começar com http ou https.");
      return false;
    }
    return true;
  };

  const handleCreate = async () => {
    if (!validate()) return;

    setLoading(true);
    setMessage(null);
    setCreated(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/links`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, destination_url: url }),
      });

      if (!res.ok) throw new Error("Erro ao criar link.");
      const data = await res.json();
      setCreated(data);
      setMessage("Link criado com sucesso!");
    } catch (err: any) {
      setMessage(err.message || "Erro desconhecido.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">Criar Novo Link de Tracking</h1>

      <div className="mb-4 flex flex-col gap-2 max-w-md">
        <input
          className="border p-2"
          type="text"
          placeholder="Nome do link"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border p-2"
          type="url"
          placeholder="URL de destino (ex: https://google.com)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          onClick={handleCreate}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Criando..." : "Criar Link"}
        </button>
      </div>

      {message && <p className="mb-4 text-blue-700">{message}</p>}

      {created && (
        <div className="border p-4 rounded bg-green-50">
          <p><strong>Link criado:</strong></p>
          <p>Nome: {created.name}</p>
          <p>ID: {created.id}</p>
          <p>
            Link de rastreamento:{" "}
            <a
              href={`${process.env.NEXT_PUBLIC_API_URL}/clicks/${created.id}`}
              target="_blank"
              className="text-blue-600 underline"
            >
              {process.env.NEXT_PUBLIC_API_URL}/clicks/{created.id}
            </a>
          </p>
        </div>
      )}
    </main>
  );
}
