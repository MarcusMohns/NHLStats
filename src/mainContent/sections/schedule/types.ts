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

export type GameWeekType = {
  date: string;
  dayAbbrev: string;
  numberOfGames: number;
  games: GameType[];
};
