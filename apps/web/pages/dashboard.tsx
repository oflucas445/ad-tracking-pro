import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const mockData = [
  { date: "01/08", clicks: 24, conversions: 4 },
  { date: "02/08", clicks: 35, conversions: 8 },
  { date: "03/08", clicks: 42, conversions: 7 },
  { date: "04/08", clicks: 31, conversions: 3 },
  { date: "05/08", clicks: 50, conversions: 10 },
  { date: "06/08", clicks: 48, conversions: 11 },
  { date: "07/08", clicks: 60, conversions: 15 },
];

export default function Dashboard() {
  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📈 Dashboard Global</h1>
      <p className="text-gray-600 mb-8">
        Acompanhe o desempenho diário dos seus links com gráficos de cliques e conversões.
      </p>

      <div className="bg-white p-4 rounded shadow border">
        <h2 className="text-lg font-semibold mb-4">🔎 Cliques vs Conversões</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockData}>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="clicks" stroke="#3182ce" name="Cliques" />
            <Line type="monotone" dataKey="conversions" stroke="#38a169" name="Conversões" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}
