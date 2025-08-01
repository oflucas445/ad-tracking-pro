import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Painel() {
  const router = useRouter();

  useEffect(() => {
    const logged = localStorage.getItem("logged");
    if (logged !== "true") {
      router.push("/login");
    }
  }, []);

  const links = [
    { href: "/links/create", label: "➕ Criar Link", bg: "bg-blue-100" },
    { href: "/dashboard", label: "📊 Estatísticas por Link", bg: "bg-green-100" },
    { href: "/conversions-panel", label: "🧾 Painel de Conversões", bg: "bg-yellow-100" },
    { href: "/conversions", label: "📥 Exportar CSV de Leads", bg: "bg-purple-100" },
    { href: "/webhooks", label: "🛰 Webhooks & Integrações", bg: "bg-pink-100" },
  ];

  return (
    <>
      <main className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">🎯 Painel do Usuário</h1>
        <p className="text-gray-600 mb-6">Bem-vindo! Acesse rapidamente os módulos da sua plataforma de tracking.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {links.map(({ href, label, bg }) => (
            <Link key={href} href={href}>
              <div className={\`\${bg} p-6 rounded-xl shadow hover:scale-105 transition cursor-pointer\`}>
                <p className="text-lg font-semibold text-gray-800">{label}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <div className="mt-10 p-4 border rounded shadow bg-white max-w-4xl mx-auto">
        <h2 className="text-xl font-bold mb-2">🔔 Webhooks de Conversão</h2>
        <p className="text-gray-700 mb-2">
          Configure o envio automático de eventos para o Facebook, Zapier ou outras plataformas.
        </p>
        <p className="text-sm text-gray-500">Status: <span className="text-green-600 font-semibold">Ativo</span> (mockado)</p>
      </div>
    </>
  );
}
