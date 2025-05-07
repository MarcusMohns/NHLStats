import { SeriesType } from "../types";
import Scoreboard from "./Scoreboard";

const GameSeries = ({ series }: { series: SeriesType }) => {
  return (
    <div className={`flex flex-col text-center justify-center m-1 md:m-2`}>
      <p className="font-bold dark:text-stone-300 leading-tight tracking-wide select-none text-sm">
        {series.seriesAbbrev}
      </p>
      {series.seriesUrl && series.bottomSeedTeam && series.topSeedTeam ? (
        <Scoreboard
          awayTeam={series.bottomSeedTeam}
          homeTeam={series.topSeedTeam}
          awayTeamScore={series.bottomSeedWins}
          homeTeamScore={series.topSeedWins}
          winningTeamId={series.winningTeamId}
          url={series.seriesUrl}
        />
      ) : series.seriesLogo ? (
        <div className="border-2 p-2 rounded border-gray-300 dark:border-stone-700">
          <img
            src={series.seriesLogo}
            alt="Series Logo"
            className="md:w-50 w-auto invert dark:invert-0"
          />
        </div>
      ) : (
        <div className="m-auto p-5 rounded border-2 border-gray-300 dark:border-stone-700 ">
          {series.seriesTitle}
        </div>
      )}
    </div>
  );
};

export default GameSeries;
