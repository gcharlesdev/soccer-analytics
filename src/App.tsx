import { useEffect, useState } from "react";
import { getStandings } from "./services/api";
import type { TeamStanding } from "./types/football";
import StandingsTable from "./components/StandingsTable";

function App() {
  const [standings, setStandings] = useState<TeamStanding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getStandings("PL");
        setStandings(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold">Soccer Analytics</h1>
          <h5 className="">Made with ❤️ by StadioCR</h5>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-6">Premier League Standings</h2>

        {loading && <p className="text-gray-400">Loading standings...</p>}

        {error && (
          <p className="text-red-500 bg-red-500/10 px-4 py-3 rounded">
            Error: {error}
          </p>
        )}

        {!loading && !error && <StandingsTable standings={standings} />}
      </main>
    </div>
  );
}

export default App;
