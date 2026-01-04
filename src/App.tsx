import { useEffect, useState } from "react";
import { getStandings } from "./services/api";
import type { TeamStanding } from "./types/football";

function App() {
  const [standings, setStanding] = useState<TeamStanding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getStandings('PL')
        setStanding(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(true);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div className="p-8 text-white">Loading....</div>
  if (error) return <div className="p-8 text-red-500">Error: {error} </div>

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Premier League Standings</h1>
      <pre className="bg-gray-800 p-4 rounded overflow-auto text-sm">
        {JSON.stringify(standings.slice(0,3), null, 2)}
      </pre>
    </div>
  );
}

export default App;
