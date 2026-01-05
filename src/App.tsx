import { useEffect, useState } from "react";
import { getStandings, getMatches } from "./services/api";
import type { TeamStanding, Match, LeagueCode } from "./types/football";
import { LEAGUES } from "./types/football";
import StandingsTable from "./components/StandingsTable";
import LeagueSelector from "./components/LeagueSelector";
import MatchList from "./components/MatchList";

type Tab = "standings" | "matches";

function App() {
  const [standings, setStandings] = useState<TeamStanding[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLeague, setSelectedLeague] = useState<LeagueCode>("PL");
  const [activeTab, setActiveTab] = useState<Tab>("standings");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        if (activeTab === "standings") {
          const data = await getStandings(selectedLeague);
          setStandings(data);
        } else {
          const data = await getMatches(selectedLeague);
          setMatches(data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [selectedLeague, activeTab]);

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
        {/* League Title */}
        <h2 className="text-xl font-semibold mb-6">
          {currentLeague?.flag} {currentLeague?.name}
        </h2>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-gray-800 p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab("standings")}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === "standings"
                ? "bg-blue-600 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Standings
          </button>
          <button
            onClick={() => setActiveTab("matches")}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === "matches"
                ? "bg-blue-600 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Matches
          </button>
        </div>

        {/* Content */}
        {loading && (
          <div className="flex items-center gap-3 text-gray-400">
            <div className="w-5 h-5 border-2 border-gray-600 border-t-blue-500 rounded-full animate-spin" />
            Loading {activeTab}...
          </div>
        )}

        {error && (
          <div className="text-red-500 bg-red-500/10 px-4 py-3 rounded">
            <p className="font-medium">Failed to load {activeTab}</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        )}

        {!loading && !error && activeTab === "standings" && (
          <StandingsTable standings={standings} />
        )}

        {!loading && !error && activeTab === "matches" && (
          <MatchList matches={matches} />
        )}
      </main>
    </div>
  );
}

export default App;
