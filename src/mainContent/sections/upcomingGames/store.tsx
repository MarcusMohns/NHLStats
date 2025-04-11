export type TeamType = {
  id: number;
  commonName: { default: string; [lang: string]: string };
  placeName: { default: string; [lang: string]: string };
  placeNameWithPreposition: { default: string; [lang: string]: string };
  abbrev: string;
  logo: string;
  darkLogo: string;
  awaySplitSquad: boolean;
  score?: number;
};

export type ErrorType = {
  error: boolean;
  text: string;
  message: string;
  name: string;
};

export type GameType = {
  id: number;
  season: number;
  gameType: number;
  venue: { default: string; es?: string; fr?: string };
  neutralSite: boolean;
  startTimeUTC: string;
  easternUTCOffset: string;
  venueUTCOffset: string;
  venueTimezone: string;
  gameState: string;
  gameScheduleState: string;
  alternateBroadcasts?: {
    country: string;
    descriptions: { default: string }[];
  }[];
  awayTeam: TeamType;
  homeTeam: TeamType;
  periodDescriptor: {
    number: number;
    periodType: string;
    maxRegulationPeriods: number;
  };
  gameOutcome?: { lastPeriodType: string };
  winningGoalie?: {
    playerId: number;
    firstInitial: { default: string };
    lastName: { default: string; cs?: string; fi?: string; sk?: string };
  };
  winningGoalScorer?: {
    playerId: number;
    firstInitial: { default: string };
    lastName: { default: string };
  };
  threeMinRecap?: string;
  threeMinRecapFr?: string;
  condensedGame?: string;
  condensedGameFr?: string;
  gameCenterLink: string;
  ticketsLink?: string;
  ticketsLinkFr?: string;
};

export type GameWeek = {
  date: string;
  dayAbbrev: string;
  numberOfGames: number;
  games: GameType[];
};

export const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const fetchUpcomingGamesData = async () => {
  const upcomingGamesUrl =
    // Run it by https://corsproxy.io/ to bypass CORS
    "https://corsproxy.io/?url=https://api-web.nhle.com/v1/schedule/now";

  try {
    const response = await fetch(upcomingGamesUrl);
    const { gameWeek } = await response.json();
    return gameWeek;
  } catch (e: unknown) {
    console.error("Error fetching Upcoming Games from API", e);
    throw e;
  }
};

export const fetchUpcomingGames = async (
  handleSetUpcomingGames: (data: GameWeek[]) => void,
  handleSetError: (e: ErrorType) => void,
  error: ErrorType
) => {
  try {
    const upcomingGamesData = await fetchUpcomingGamesData();

    if (!upcomingGamesData) {
      throw new Error("No Upcoming Games data");
    }

    handleSetUpcomingGames(upcomingGamesData);
    handleSetError({ error: false, text: "", message: "", name: "" });
  } catch (e) {
    !error.error &&
      handleSetError({
        error: true,
        text: "Something went wrong fetching Upcoming Games data 🙁",
        message: (e as Error).message,
        name: "fetchUpcomingGames",
      });
    throw e;
  }
};
