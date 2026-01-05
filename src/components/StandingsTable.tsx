import type { TeamStanding } from "../types/football";

interface StandingsTableProps {
  standings: TeamStanding[];
}

function StandingsTable({ standings }: StandingsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-gray-800 text-gray-400 text-sm uppercase">
          <tr>
            <th className="px-4 py-3 w-12">#</th>
            <th className="px-4 py-3">Team</th>
            <th className="px-4 py-3 text-center">MP</th>
            <th className="px-4 py-3 text-center">W</th>
            <th className="px-4 py-3 text-center">D</th>
            <th className="px-4 py-3 text-center">L</th>
            <th className="px-4 py-3 text-center">GF</th>
            <th className="px-4 py-3 text-center">GA</th>
            <th className="px-4 py-3 text-center">GD</th>
            <th className="px-4 py-3 text-center font-bold">Pts</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {standings.map((row) => (
            <tr
              key={row.team.id}
              className="hover:bg-gray-800/50 transition-colors"
            >
              <td className="px-4 py-3 font-medium">{row.position}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <img
                    src={row.team.crest}
                    alt={row.team.name}
                    className="w-6 h-6 object-contain"
                  />
                  <span className="font-medium">{row.team.shortName}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-center text-gray-400">
                {row.playedGames}
              </td>
              <td className="px-4 py-3 text-center">{row.won}</td>
              <td className="px-4 py-3 text-center">{row.draw}</td>
              <td className="px-4 py-3 text-center">{row.lost}</td>
              <td className="px-4 py-3 text-center">{row.goalsFor}</td>
              <td className="px-4 py-3 text-center">{row.goalsAgainst}</td>
              <td className="px-4 py-3 text-center">
                <span
                  className={
                    row.goalDifference > 0
                      ? "text-green-400"
                      : row.goalDifference < 0
                      ? "text-red-400"
                      : ""
                  }
                >
                  {row.goalDifference > 0 ? "+" : ""}
                  {row.goalDifference}
                </span>
              </td>
              <td className="px-4 py-3 text-center font-bold">{row.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StandingsTable;
