import { useEffect, useState } from "react";

export default function Home() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/links")
      .then((res) => res.json())
      .then(setLinks);
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">Meus Links de Tracking</h1>
      {links.map((link: any) => (
        <div key={link.id} className="border p-4 mb-2">
          <p><strong>{link.name}</strong></p>
          <p><a href={`http://localhost:8000/clicks/${link.id}`} target="_blank">Link de Redirecionamento</a></p>
        </div>
      ))}
    </main>
  );
}