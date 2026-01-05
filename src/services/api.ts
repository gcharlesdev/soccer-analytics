import type {
  ApiResponse,
  StandingsResponse,
  Match,
  LeagueCode,
} from "../types/football";

const BASE_URL = "/api/football/v4";

async function fetchApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`);

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error("Rate limit exceeded. Please wait a minute.");
    }
    if (response.status === 403) {
      throw new Error("Invalid API key or unauthorized access.");
    }
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function getStandings(league: LeagueCode) {
  const data = await fetchApi<ApiResponse<StandingsResponse[]>>(
    `/competitions/${league}/standings`
  );

  return data.standings?.[0]?.table ?? [];
}

export async function getMatches(
  league: LeagueCode,
  options?: {
    matchday?: number;
    status?: "SCHEDULED" | "FINISHED" | "IN_PLAY";
    dateFrom?: string;
    dateTo?: string;
  }
) {
  const params = new URLSearchParams();

  if (options?.matchday) params.set("matchday", String(options.matchday));
  if (options?.status) params.set("status", options.status);
  if (options?.dateFrom) params.set("dateFrom", options.dateFrom);
  if (options?.dateTo) params.set("dateTo", options.dateTo);

  const query = params.toString();
  const url = `/competitions/${league}/matches${query ? `?${query}` : ""}`;

  const data = await fetchApi<ApiResponse<Match[]>>(url);

  return data.matches ?? [];
}

export async function getCompetition(league: LeagueCode) {
  return fetchApi<ApiResponse<never>>(`/competitions/${league}`);
}
