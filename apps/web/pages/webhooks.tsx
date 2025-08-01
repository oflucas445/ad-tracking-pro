import { useState } from "react";

export default function WebhooksPage() {
  const [enabled, setEnabled] = useState(true);
  const [platform, setPlatform] = useState("facebook");
  const [email, setEmail] = useState("lucas@email.com");

  const webhookUrl = "https://api.seusite.com/webhook/conversion?token=XYZ123";

  const handleToggle = () => {
    setEnabled((prev) => !prev);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(webhookUrl);
    alert("Webhook copiado!");
  };

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🛰 Webhooks de Conversão</h1>

      <div className="bg-white rounded shadow p-6 space-y-6 border">
        <div>
          <label className="block font-medium mb-1">Plataforma de Integração:</label>
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
          <p className={enabled ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
            {enabled ? "Ativado" : "Desativado"}
          </p>
          <button
            onClick={handleToggle}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
          >
            {enabled ? "Desativar" : "Ativar"} Webhook
          </button>
        </div>

        <div>
          <label className="block font-medium mb-1">E-mail para notificação:</label>
          <input
            type="email"
            className="border p-2 rounded w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">URL do Webhook:</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              className="border p-2 rounded w-full"
              value={webhookUrl}
              readOnly
            />
            <button
              onClick={handleCopy}
              className="bg-gray-800 text-white px-3 py-2 rounded"
            >
              Copiar
            </button>
          </div>
        </div>

        <div className="bg-gray-50 p-4 text-sm rounded border border-dashed">
          <p className="mb-2">
            Quando o webhook estiver ativado, cada conversão será automaticamente enviada para a plataforma selecionada.
          </p>
          <p>
            A URL acima será usada para validação com token. Em breve será possível integrar com o Facebook CAPI em tempo real.
          </p>
        </div>
      </div>
    </main>
  );
}
