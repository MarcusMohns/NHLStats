export type TeamType = {
  clinchIndicator?: string;
  rank: number;
  teamName: { default: string };
  teamAbbrev: { default: string };
  teamCommonName: { default: string };
  teamLogo: string;
  teamLogoDark: string;
  points: number;
  gamesPlayed: number;
  wins: number;
  losses: number;
  otLosses: number;
  goalDifferential: number;
  l10Wins: number;
  l10Losses: number;
  l10OtLosses: number;
  streakCode: string;
  streakCount: number;
  conferenceName: string;
  divisionName: string;
  wildCardSequence: number;
  winPctg: number;
};

export type StandingsType = {
  [key: string]: TeamType[];
  League: TeamType[];
  Western: TeamType[];
  Eastern: TeamType[];
  Central: TeamType[];
  Atlantic: TeamType[];
  Metropolitan: TeamType[];
  Pacific: TeamType[];
};

export type StandingsTableType = {
  standings: TeamType[];
  sortedBy: string;
};

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
