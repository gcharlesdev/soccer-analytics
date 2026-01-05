import { useEffect, useState } from "react";
import { getStandings } from "./services/api";
import type { TeamStanding, LeagueCode } from "./types/football";
import { LEAGUES } from "./types/football";
import StandingsTable from "./components/StandingsTable";
import LeagueSelector from "./components/LeagueSelector";

function App() {
  const [standings, setStandings] = useState<TeamStanding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLeague, setSelectedLeague] = useState<LeagueCode>("PL");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const data = await getStandings(selectedLeague);
        setStandings(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [selectedLeague]); // Re-fetch when league changes

  // Find current league info for display
  const currentLeague = LEAGUES.find((l) => l.code === selectedLeague);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Soccer Analytics</h1>
          <LeagueSelector
            selected={selectedLeague}
            onChange={setSelectedLeague}
          />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-6">
          {currentLeague?.country} {currentLeague?.name} Standings
        </h2>

        {loading && (
          <div className="flex items-center gap-3 text-gray-400">
            <div className="w-5 h-5 border-2 border-gray-600 border-t-blue-500 rounded-full animate-spin" />
            Loading standings...
          </div>
        )}

        {error && (
          <div className="text-red-500 bg-red-500/10 px-4 py-3 rounded">
            <p className="font-medium">Failed to load standings</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        )}

        {!loading && !error && <StandingsTable standings={standings} />}
      </main>
    </div>
  );
}

export default App;
