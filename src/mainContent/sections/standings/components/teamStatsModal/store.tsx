import { TeamType } from "../../store";
import { ErrorType } from "../../../leaderboard/store";
import { sortFunctions } from "../../../../../utility/sortFunctions";

export type GameType = {
  id: number;
  season: number;
  gameType: number;
  gameDate: string;
  gameOutcome?: { lastPeriodType: string };
  venue: {
    default: string;
    es?: string;
    fr?: string;
  };
  neutralSite: boolean;
  startTimeUTC: string;
  easternUTCOffset: string;
  venueUTCOffset: string;
  venueTimezone: string;
  gameState: string;
  gameScheduleState: string;
  tvBroadcasts: {
    id: number;
    market: string;
    countryCode: string;
    network: string;
    sequenceNumber: number;
  }[];
  awayTeam: {
    id: number;
    commonName: {
      default: string;
    };
    placeName: {
      default: string;
      fr?: string;
    };
    placeNameWithPreposition: {
      default: string;
      fr?: string;
    };
    abbrev: string;
    logo: string;
    darkLogo: string;
    awaySplitSquad: boolean;
    radioLink?: string;
    hotelLink?: string;
    hotelDesc?: string;
    score?: number;
  };
  homeTeam: {
    id: number;
    commonName: {
      default: string;
    };
    placeName: {
      default: string;
      fr?: string;
    };
    placeNameWithPreposition: {
      default: string;
      fr?: string;
    };
    abbrev: string;
    logo: string;
    darkLogo: string;
    homeSplitSquad: boolean;
    radioLink?: string;
    hotelLink?: string;
    hotelDesc?: string;
    score?: number;
  };
  periodDescriptor: {
    number: number;
    periodType: string;
    maxRegulationPeriods: number;
  };
  ticketsLink?: string;
  ticketsLinkFr?: string;
  gameCenterLink: string;
  threeMinRecap?: string;
  threeMinRecapFr?: string;
  condensedGame?: string;
  condensedGameFr?: string;
};

export type SkaterType = {
  assists: number;
  avgShiftsPerGame: number;
  avgTimeOnIcePerGame: number;
  faceoffWinPctg: number;
  firstName: { default: string };
  gameWinningGoals: number;
  gamesPlayed: number;
  goals: number;
  headshot: string;
  lastName: { default: string };
  overtimeGoals: number;
  penaltyMinutes: number;
  playerId: number;
  plusMinus: number;
  points: number;
  positionCode: string;
  powerPlayGoals: number;
  shootingPctg: number;
  shorthandedGoals: number;
  shots: number;
};

export type GoalieType = {
  assists: number;
  firstName: { default: string };
  gamesPlayed: number;
  gamesStarted: number;
  goals: number;
  goalsAgainst: number;
  goalsAgainstAverage: number;
  headshot: string;
  lastName: { default: string };
  losses: number;
  overtimeLosses: number;
  penaltyMinutes: number;
  playerId: number;
  points: number;
  savePercentage: number;
  saves: number;
  shotsAgainst: number;
  shutouts: number;
  ties: number;
  timeOnIce: number;
  wins: number;
};

export type TeamStatsType = {
  skaters: SkaterType[];
  goalies: GoalieType[];
  gameType: number;
  games: GameType[];
  season: string;
  topSkaters: SkaterType[];
  topGoalie: GoalieType;
};

const fetchData = async (urlString: string) => {
  const url = urlString;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return await data;
  } catch (e: unknown) {
    console.error("Error fetching team data from API", e);
    throw e;
  }
};

export const fetchTeamsAndGames = async (
  handleSetModal: (team: TeamStatsType) => void,
  handleSetError: (error: ErrorType) => void,
  team: TeamType
) => {
  const teamUrl = `https://corsproxy.io/?url=https://api-web.nhle.com/v1/club-stats/${team.teamAbbrev.default}/now`;
  const gamesUrl = `https://corsproxy.io/?url=https://api-web.nhle.com/v1/club-schedule/${team.teamAbbrev.default}/week/now`;
  // Run both by https://corsproxy.io/ to bypass CORS
  try {
    const teamData = await fetchData(teamUrl);
    const gamesThisWeekData = await fetchData(gamesUrl);
    if (!teamData || !gamesThisWeekData) throw new Error("Error getting data");

    const playersByPoints = sortFunctions.Points(teamData.skaters);
    const goaliesByPercentage = sortFunctions.Points(teamData.goalies);
    const topSkaters = playersByPoints.slice(0, 2);
    const topGoalie = goaliesByPercentage[0];

    handleSetModal({
      ...teamData,
      topSkaters: topSkaters,
      topGoalie: topGoalie,
      games: gamesThisWeekData.games,
    });
  } catch (e) {
    handleSetError({
      error: true,
      text: "Something went wrong getting team info 🙁",
      message: (e as Error).message,
      name: "fetchAndSetTeamsAndWeeklyStats",
    });
    throw e;
  }
};
