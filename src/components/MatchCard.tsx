import type { Match } from "../types/football";

interface MatchCardProps {
  match: Match;
}

function MatchCard({ match }: MatchCardProps) {
  const { homeTeam, awayTeam, score, status, utcDate } = match;

  const isFinished = status === "FINISHED";
  const isLive = status === "IN_PLAY" || status === "PAUSED";

  const matchDate = new Date(utcDate);
  const formattedDate = matchDate.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
  const formattedTime = matchDate.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-colors">
      {/* Status Badge */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs text-gray-400">
          {formattedDate} • {formattedTime}
        </span>
        {isLive && (
          <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full animate-pulse">
            LIVE
          </span>
        )}
        {isFinished && (
          <span className="text-xs bg-gray-600 text-gray-300 px-2 py-0.5 rounded">
            FT
          </span>
        )}
      </div>

      {/* Teams & Score */}
      <div className="space-y-2">
        {/* Home Team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={homeTeam.crest}
              alt={homeTeam.name}
              className="w-6 h-6 object-contain"
            />
            <span className="font-medium">{homeTeam.shortName}</span>
          </div>
          <span
            className={`text-lg font-bold ${
              isFinished && score.winner === "HOME_TEAM" ? "text-green-400" : ""
            }`}
          >
            {score.fullTime.home ?? "-"}
          </span>
        </div>

        {/* Away Team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={awayTeam.crest}
              alt={awayTeam.name}
              className="w-6 h-6 object-contain"
            />
            <span className="font-medium">{awayTeam.shortName}</span>
          </div>
          <span
            className={`text-lg font-bold ${
              isFinished && score.winner === "AWAY_TEAM" ? "text-green-400" : ""
            }`}
          >
            {score.fullTime.away ?? "-"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MatchCard;
