import type {
    ApiResponse,
    StandingsResponse,
    Match,
    LeagueCode
} from '../types/football'

const BASE_URL = '/api/football/v4'

async function fetchApi<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
        if (response.status === 429) {
            throw new Error('Rate limit exceeded. Please try again later.')
        }
        if (response.status === 403) {
            throw new Error ('Invalid API Key or unauthorized access.')
        }
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return response.json()
}

export async function getStandings(league: LeagueCode) {
    const data = await fetchApi<ApiResponse<StandingsResponse[]>>(
        `/competitions/${league}/standings`
    )

    return data.standings?.[0].table ?? []
}

export async function getMatches(league: LeagueCode, matchday?: number) {
    const params = matchday ? `?matchday=${matchday}` : ''
    const data = await fetchApi<ApiResponse<Match[]>>(
        `/competitions/${league}/matches${params}`
    )

    return data.matches ?? []
}

export async function getCompetition(league: LeagueCode) {
    return fetchApi<ApiResponse<never>>(
        `/competitions/${league}`
    );
}
