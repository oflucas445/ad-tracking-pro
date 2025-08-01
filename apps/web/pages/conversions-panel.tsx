import { useState } from "react";

export default function ConversionsPanel() {
  const [linkId, setLinkId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [conversions, setConversions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sendingId, setSendingId] = useState<string | null>(null);

  const fetchConversions = async () => {
    if (!linkId) {
      setError("Insira o ID do link.");
      return;
    }
    setError(null);
    setLoading(true);
    let url = `${process.env.NEXT_PUBLIC_API_URL}/conversions/by-link/${linkId}`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Erro ao buscar conversões.");
      const data = await res.json();
      setConversions(data);
    } catch (err: any) {
      setError(err.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  const resendToFacebook = async (conversion: any) => {
    setSendingId(conversion.id);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/conversions/send-facebook`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-token": "default_token", // certifique-se de usar o token correto do backend
        },
        body: JSON.stringify({
          timestamp: new Date(conversion.timestamp).getTime() / 1000,
          source_url: "https://seu-site.com/agradecimento",
          ip: "0.0.0.0",
          user_agent: "browser",
          fbp: "fake_fbp",
          fbc: "fake_fbc",
          email: conversion.email,
          telefone: conversion.telefone,
          produto: conversion.produto,
          value: conversion.value,
        }),
      });

      if (response.ok) {
        alert(`Conversão ${conversion.id} reenviada com sucesso!`);
      } else {
        alert(`Erro ao reenviar conversão ${conversion.id}`);
      }
    } catch (e) {
      alert("Erro de rede ao reenviar.");
    } finally {
      setSendingId(null);
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">Painel de Conversões por Link</h1>

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
          onClick={fetchConversions}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Buscar Conversões
        </button>
      </div>

      {loading && <p className="text-gray-500">Carregando conversões...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {conversions.map((conv: any) => (
        <div key={conv.id} className="border p-4 mb-2 rounded bg-gray-50">
          <p><strong>ID:</strong> {conv.id}</p>
          <p><strong>Valor:</strong> R$ {conv.value}</p>
          <p><strong>Email:</strong> {conv.email}</p>
          <p><strong>Telefone:</strong> {conv.telefone}</p>
          <p><strong>Produto:</strong> {conv.produto}</p>
          <p><strong>Registrado em:</strong> {new Date(conv.timestamp).toLocaleString()}</p>
          <button
            disabled={sendingId === conv.id}
            onClick={() => resendToFacebook(conv)}
            className="mt-2 bg-green-600 text-white px-4 py-1 rounded disabled:opacity-50"
          >
            {sendingId === conv.id ? "Enviando..." : "Reenviar ao Facebook"}
          </button>
        </div>
      ))}
    </main>
  );
}
