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
    currentMatchday: number
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
    winner: 'HOME_TEAM' | 'AWAY_TEAM' | 'DRAW' | null;
    fullTime: {
        homeTeam: number | null;
        awayTeam: number | null;
    };
    halfTime: {
        homeTeam: number | null;
        awayTeam: number | null;
    };
}

export type LeagueCode = 'PL' | 'PD' | 'SA' | 'BL1' | 'FL1' | 'CL';

export const LEAGUES: Record<LeagueCode, string> = {
    PL: 'Premier League',
    PD: 'La Liga',
    SA: 'Serie A',
    BL1: 'Bundesliga',
    FL1: 'Ligue 1',
    CL: 'Champions League',
}
