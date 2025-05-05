import { SeriesDataType } from "../types";
import Scoreboard from "./Scoreboard";

const GameSeries = ({ series }: { series: SeriesDataType }) => {
  return (
    <div
      className="flex items-center justify-center text-sm font-bold 
    text-stone-500 dark:text-stone-400 border-1 
    border-stone-300 dark:border-stone-700 rounded h-max p-2 m-auto"
    >
      {series.seriesUrl && series.bottomSeedTeam && series.topSeedTeam ? (
        <div className="flex items-center justify-center">
          <Scoreboard
            awayTeam={series.bottomSeedTeam}
            homeTeam={series.topSeedTeam}
            awayTeamScore={series.bottomSeedWins}
            homeTeamScore={series.topSeedWins}
          />
        </div>
      ) : series.seriesLogo ? (
        <img src={series.seriesLogo} alt="Series Logo" />
      ) : (
        <div className="flex items-center justify-center">
          {series.seriesTitle}
        </div>
      )}
    </div>
  );
};

export default GameSeries;
