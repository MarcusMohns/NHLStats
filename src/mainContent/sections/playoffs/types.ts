export type PlayoffsType = {
  bracketLogo: string;
  bracketLogoFr: string;
  series: SeriesType[];
};

export type SeriesType = {
  seriesUrl?: string;
  seriesTitle: string;
  seriesAbbrev: string;
  seriesLetter: string;
  playoffRound: number;
  topSeedRank: number;
  topSeedRankAbbrev?: string;
  topSeedWins: number;
  bottomSeedRank: number;
  bottomSeedRankAbbrev?: string;
  bottomSeedWins: number;
  topSeedTeam?: TeamType;
  bottomSeedTeam?: TeamType;
  seriesLogo?: string;
  seriesLogoFr?: string;
  winningTeamId?: number;
};

export type TeamType = {
  id: number;
  abbrev: string;
  name: {
    default: string;
    fr?: string;
  };
  commonName: {
    default: string;
  };
  placeNameWithPreposition: {
    default: string;
    fr?: string;
  };
  logo: string;
  darkLogo: string;
};
