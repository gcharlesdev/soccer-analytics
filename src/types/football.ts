export interface ApiResponse<T> {
  filters: Record<string, any>;
  resultSet?: {
    count: number;
    first: string;
    last: string;
    played: number;
  };
  competition: Competition;
  season: Season;
  standings?: T;
  matches?: T;
}

export interface Competition {
  id: number;
  name: string;
  code: string;
  type: string;
  emblem: string;
}

export interface Season {
  id: number;
  startDate: string;
  endDate: string;
  currentMatchday: number;
}

export interface StandingsResponse {
  stage: string;
  type: string;
  table: TeamStanding[];
}

export interface TeamStanding {
  position: number;
  team: Team;
  playedGames: number;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
}

export interface Team {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
}

export interface Match {
  id: number;
  status: MatchStatus;
  matchday: number;
  stage: string;
  utcDate: string;
  homeTeam: Team;
  awayTeam: Team;
  score: Score;
}

export type MatchStatus =
  | "SCHEDULED"
  | "TIMED"
  | "IN_PLAY"
  | "PAUSED"
  | "FINISHED"
  | "POSTPONED"
  | "CANCELED";

export interface Score {
  winner: "HOME_TEAM" | "AWAY_TEAM" | "DRAW" | null;
  fullTime: {
    home: number | null;
    away: number | null;
  };
  halfTime: {
    home: number | null;
    away: number | null;
  };
}

export type LeagueCode =
  | "PL" // Premier League
  | "ELC" // Championship
  | "PD" // La Liga
  | "BL1" // Bundesliga
  | "SA" // Serie A (Italy)
  | "FL1" // Ligue 1
  | "DED" // Eredivisie
  | "PPL" // Primeira Liga
  | "BSA"; // Brasileirão

export interface League {
  code: LeagueCode;
  name: string;
  country: string;
  flag: string;
}

export const LEAGUES: League[] = [
  { code: "PL", name: "Premier League", country: "England", flag: "󠁧󠁢󠁥󠁮󠁧EN" },
  { code: "ELC", name: "2. Championship", country: "England", flag: "EN" },
  { code: "PD", name: "La Liga", country: "Spain", flag: "ES" },
  { code: "BL1", name: "Bundesliga", country: "Germany", flag: "DE" },
  { code: "SA", name: "Serie A", country: "Italy", flag: "IT" },
  { code: "FL1", name: "Ligue 1", country: "France", flag: "FR" },
  { code: "DED", name: "Eredivisie", country: "Netherlands", flag: "NL" },
  { code: "PPL", name: "Primeira Liga", country: "Portugal", flag: "PT" },
  { code: "BSA", name: "Série A", country: "Brazil", flag: "BR" },
];
