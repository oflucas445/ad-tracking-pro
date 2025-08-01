import Link from "next/link";

export default function Home() {
  return (
    <main className="p-6 max-w-2xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">🚀 Ad Tracking Pro</h1>
      <p className="mb-6 text-gray-700">
        Rastreie cliques, leads e conversões com precisão. Integração direta com o Facebook CAPI.
      </p>
      <Link
        href="/login"
        className="bg-blue-600 text-white px-6 py-3 rounded font-medium"
      >
        Acessar Painel
      </Link>
    </main>
  );
}
