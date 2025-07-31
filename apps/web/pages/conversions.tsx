import { useEffect, useState } from "react";

export default function Conversions() {
  const [linkId, setLinkId] = useState("");
  const [conversions, setConversions] = useState([]);

  const fetchConversions = async () => {
    const res = await fetch(`http://localhost:8000/conversions/by-link/${linkId}`);
    const data = await res.json();
    setConversions(data);
  };

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">Conversões por Link</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Insira o ID do link"
          value={linkId}
          onChange={(e) => setLinkId(e.target.value)}
          className="border px-3 py-2 mr-2"
        />
        <button
          onClick={fetchConversions}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Buscar
        </button>
      </div>

      {conversions.map((conv: any, index) => (
        <div key={index} className="border p-4 mb-2 rounded bg-gray-50">
          <p><strong>Valor:</strong> R${conv.value}</p>
          <p><strong>Email:</strong> {conv.email}</p>
          <p><strong>Telefone:</strong> {conv.telefone}</p>
          <p><strong>Produto:</strong> {conv.produto}</p>
          <p><strong>UTM Campaign:</strong> {conv.utm_campaign}</p>
          <p><strong>UTM Content:</strong> {conv.utm_content}</p>
          <p><strong>Registrado em:</strong> {new Date(conv.timestamp).toLocaleString()}</p>
        </div>
      ))}
    </main>
  );
}
