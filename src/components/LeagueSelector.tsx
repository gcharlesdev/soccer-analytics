import { LEAGUES, type LeagueCode } from "../types/football";

interface LeagueSelectorProps {
  selected: LeagueCode;
  onChange: (league: LeagueCode) => void;
}

function LeagueSelector({ selected, onChange }: LeagueSelectorProps) {
  return (
    <select
      value={selected}
      onChange={(e) => onChange(e.target.value as LeagueCode)}
      className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2
                 text-white focus:outline-none focus:border-blue-500
                 cursor-pointer"
    >
      {LEAGUES.map((league) => (
        <option key={league.code} value={league.code}>
          {league.flag} {league.name}
        </option>
      ))}
    </select>
  );
}

export default LeagueSelector;
