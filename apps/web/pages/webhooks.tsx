import { useState } from "react";

export default function WebhooksPage() {
  const [enabled, setEnabled] = useState(true);
  const [platform, setPlatform] = useState("facebook");

  const handleToggle = () => {
    setEnabled((prev) => !prev);
    // futura chamada para backend
  };

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🛰 Webhooks de Conversão</h1>

      <div className="bg-white rounded shadow p-4 space-y-4 border">
        <p className="text-gray-700">
          Gerencie a integração com plataformas externas para envio de conversões.
        </p>

        <div>
          <label className="block font-medium mb-1">
            Plataforma de Integração:
          </label>
          <select
            className="border p-2 rounded w-full"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            <option value="facebook">Facebook CAPI</option>
            <option value="zapier">Zapier</option>
            <option value="custom">Webhook Customizado</option>
          </select>
        </div>

        <div>
          <p className="font-medium">Status:</p>
          <p className={enabled ? "text-green-600" : "text-red-600"}>
            {enabled ? "Ativado" : "Desativado"}
          </p>
        </div>

        <button
          onClick={handleToggle}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {enabled ? "Desativar" : "Ativar"} Webhook
        </button>
      </div>
    </main>
  );
}
