export interface Fixtures {
    get: string;
    parameters: Parameters;
    errors: any[];
    results: number;
    paging: Paging;
    response: Response[];
}

export interface Paging {
    current: number;
    total: number;
}

export interface Parameters {
    date: string;
    timezone: Timezone;
}

export enum Timezone {
    EuropeBucharest = "Europe/Bucharest",
}

export interface Response {
    fixture: Fixture;
    league: League;
    teams: Teams;
    goals: Goals;
    score: Score;
}

export interface Fixture {
    id: number;
    referee: null | string;
    timezone?: Timezone;
    date: string;
    timestamp: number;
    venue?: Venue;
}

export interface Venue {


    id: number | null;
    name: null | string;
    city: null | string;
}

export interface Goals {
    home: number | null;
    away: number | null;
}

export interface League {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: null | string;
    season: number;
    round: string;
}


export interface Score {
    halftime?: Goals;
    fulltime?: Goals;
    extratime?: Goals;
    penalty?: Goals;

}

export interface Teams {
    home: Away;
    away: Away;
}

export interface Away {
    id: number;
    name: string;
    logo: string;
    winner: boolean | null;
}