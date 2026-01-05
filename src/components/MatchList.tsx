import type { Match } from "../types/football";
import MatchCard from "./MatchCard";

interface MatchListProps {
  matches: Match[];
  title?: string;
}

function MatchList({ matches, title }: MatchListProps) {
  if (matches.length === 0) {
    return <p className="text-gray-400 text-center py-8">No matches found.</p>;
  }

  // Group matches by matchday
  const matchesByMatchday = matches.reduce<Record<number, Match[]>>(
    (acc, match) => {
      const day = match.matchday;
      if (!acc[day]) acc[day] = [];
      acc[day].push(match);
      return acc;
    },
    {}
  );

  return (
    <div>
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}

      <div className="space-y-6">
        {Object.entries(matchesByMatchday).map(([matchday, dayMatches]) => (
          <div key={matchday}>
            <h4 className="text-sm text-gray-400 mb-3">Matchday {matchday}</h4>
            <div className="grid gap-3 sm:grid-cols-2">
              {dayMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MatchList;
