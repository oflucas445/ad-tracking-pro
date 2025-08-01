import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (localStorage.getItem("logged") === "true") {
      router.push("/painel");
    }
  }, []);

  const handleLogin = () => {
    if (!email || !senha) {
      setErro("Preencha todos os campos.");
      return;
    }
    // Simulação de login
    localStorage.setItem("logged", "true");
    router.push("/painel");
  };

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <input
        type="email"
        placeholder="Seu e-mail"
        className="border p-2 w-full mb-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        className="border p-2 w-full mb-4"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Entrar
      </button>
      {erro && <p className="text-red-600 mt-2">{erro}</p>}
    </main>
  );
}
