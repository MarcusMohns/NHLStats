import { SeriesType } from "../types";
import Scoreboard from "./Scoreboard";

const GameSeries = ({ series }: { series: SeriesType }) => {
  return (
    <div
      className={`flex flex-col text-center h-auto align-between justify-center l my-3 w-full
      `}
    >
      {series.seriesUrl && series.bottomSeedTeam && series.topSeedTeam ? (
        <Scoreboard
          awayTeam={series.bottomSeedTeam}
          homeTeam={series.topSeedTeam}
          awayTeamScore={series.bottomSeedWins}
          homeTeamScore={series.topSeedWins}
        />
      ) : series.seriesLogo ? (
        <div className="border-2 p-2 rounded border-gray-300 dark:border-stone-700">
          <img
            src={series.seriesLogo}
            alt="Series Logo"
            className="w-full invert dark:invert-0"
          />
        </div>
      ) : (
        <div className="m-auto p-5 rounded border-2 border-gray-300 dark:border-stone-700">
          {series.seriesTitle}
        </div>
      )}
    </div>
  );
};

export default GameSeries;
