const GameSeries = ({ series }: { series: SeriesType }) => {
  console.log("series", series);
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-center border-1 border-stone-300 dark:border-stone-700 rounded h-max p-3 m-auto">
        {series.seriesTitle}
      </div>
      <div className="flex items-center justify-center text-sm font-bold text-stone-500 dark:text-stone-400">
        {series.bottomSeedTeam ? series.bottomSeedTeam.name.default : ""} vs{" "}
        {series.topSeedTeam ? series.topSeedTeam.name.default : ""}
      </div>
    </div>
  );
};

export default GameSeries;

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
  topSeedTeam?: {
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
  bottomSeedTeam?: {
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
  seriesLogo?: string;
  seriesLogoFr?: string;
};
