import { useState } from "react";
import { useRouter } from "next/router";

export default function CreateLink() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    destination: "",
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_content: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.destination) {
      setError("Preencha pelo menos o nome e o destino do link.");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/links`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Erro ao criar o link.");
      router.push("/painel");
    } catch (err: any) {
      setError(err.message || "Erro ao criar link.");
    }
  };

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Criar Novo Link</h1>

      {["name", "destination", "utm_source", "utm_medium", "utm_campaign", "utm_content"].map((field) => (
        <input
          key={field}
          name={field}
          placeholder={field.replace("utm_", "utm.")}
          className="border p-2 mb-2 w-full"
          value={(form as any)[field]}
          onChange={handleChange}
        />
      ))}

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full mt-2"
      >
        Criar Link
      </button>

      {error && <p className="text-red-600 mt-2">{error}</p>}
    </main>
  );
}
