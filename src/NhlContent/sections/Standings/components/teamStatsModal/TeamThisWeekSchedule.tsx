import { GameType } from "./TeamStatsModal";
import { linkOutIcon } from "../../../../components/svgs";

type TeamThisWeekScheduleProps = {
  game: GameType;
  teamAbbrev: string;
};

const TeamThisWeekSchedule = ({
  game,
  teamAbbrev,
}: TeamThisWeekScheduleProps) => {
  return (
    <div
      className={`flex flex-row shadow-md font-medium my-1 p-2 w-full
    ${
      game.gameOutcome &&
      game.homeTeam.score !== undefined &&
      game.awayTeam.score !== undefined
        ? teamAbbrev === game.homeTeam.abbrev
          ? game.homeTeam.score > game.awayTeam.score
            ? "bg-green-200 dark:bg-green-800 win"
            : "bg-red-200 dark:bg-red-500 loss"
          : game.awayTeam.score > game.homeTeam.score
          ? "bg-green-200 dark:bg-green-800 win"
          : "bg-red-200 dark:bg-red-500 loss"
        : "bg-gray-100 dark:bg-stone-800"
    }
    `}
    >
      {game.gameState === "LIVE" ? (
        <div className="flex flex-row items-center p-1 px-2 rounded-full bg-green-700 hover:bg-green-600">
          <a
            className="text-white underline ml-auto flex flex-row text-xs items-center"
            href={`https://www.nhl.com${game.gameCenterLink}`}
            target="_blank"
          >
            Live
          </a>
          <span className="rounded-full bg-red-500 w-3 h-3 ml-1 animate-pulse block" />
        </div>
      ) : (
        <p className="date self-start min-w-25">{game.gameDate}</p>
      )}
      <div className="match w-full flex flex-row self-center justify-center align-center">
        <div className="team flex flex-row">
          <p className="team-name">{game.homeTeam.abbrev}</p>
          <img
            src={game.homeTeam.logo}
            className="w-10 dark:hidden"
            alt={game.homeTeam.abbrev}
          />
          <img
            src={game.homeTeam.darkLogo}
            className="w-10 hidden dark:block"
            alt={game.homeTeam.abbrev}
          />
          <p className="home-team-score min-w-2">
            {game.homeTeam.score !== undefined ? game.homeTeam.score : "-"}
          </p>
        </div>
        <p className="mx-2">vs</p>
        <div className="team flex flex-row">
          <p className="away-team-score min-w-2">
            {game.awayTeam.score !== undefined ? game.awayTeam.score : "-"}
          </p>
          <img
            src={game.awayTeam.logo}
            className="w-10 dark:hidden"
            alt={game.awayTeam.abbrev}
          />
          <img
            src={game.awayTeam.darkLogo}
            className="w-10 hidden dark:block"
            alt={game.awayTeam.abbrev}
          />
          <p>{game.awayTeam.abbrev}</p>
        </div>
      </div>

      {game.gameCenterLink && (
        <a
          className="ml-auto"
          href={`https://www.nhl.com${game.gameCenterLink}`}
          target="_blank"
        >
          {linkOutIcon}
        </a>
      )}
    </div>
  );
};

export default TeamThisWeekSchedule;
