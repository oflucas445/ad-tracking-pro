import Link from "next/link";

export default function Painel() {
  const links = [
    { href: "/", label: "Meus Links" },
    { href: "/links/create", label: "Criar Link" },
    { href: "/dashboard", label: "Estatísticas por Link" },
    { href: "/conversions-panel", label: "Painel de Conversões" },
    { href: "/conversions", label: "Exportar Conversões" },
  ];

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Painel Principal</h1>
      <ul className="space-y-4 max-w-md">
        {links.map(({ href, label }) => (
          <li key={href} className="border p-4 rounded shadow hover:bg-gray-50 transition">
            <Link href={href} className="text-blue-600 font-medium">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
