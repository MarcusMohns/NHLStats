import { GameType } from "./TeamStatsModal";

type TeamThisWeekScheduleProps = {
  game: GameType;
  teamAbbrev: string;
};

const linkOutIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#000000"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M15 3h6v6"></path>
    <path d="M10 14 21 3"></path>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
  </svg>
);

const TeamThisWeekSchedule = ({
  game,
  teamAbbrev,
}: TeamThisWeekScheduleProps) => {
  return (
    <div
      className={`flex flex-row shadow-md font-medium my-1 p-2 flex align-center justify-center 
    ${
      game.homeTeam.score && game.awayTeam.score
        ? teamAbbrev === game.homeTeam.abbrev
          ? game.homeTeam.score > game.awayTeam.score
            ? "bg-green-200"
            : "bg-red-200"
          : game.homeTeam.score < game.awayTeam.score
          ? "bg-green-200"
          : "bg-red-200"
        : "bg-gray-100"
    }
    `}
    >
      <p>{game.gameDate}</p>
      <div className="flex flex-row min-w-40 align-center justify-end">
        <p className="">{game.homeTeam.abbrev}</p>
        <img src={game.homeTeam.logo} className="w-10" />
        <p className="ml-2">
          {game.homeTeam.score ? game.homeTeam.score : "-"}
        </p>
      </div>
      <p className="text-center min-w-10">vs</p>
      <div className="flex flex-row min-w-40 align-center justify-start">
        <p className="mr-2">
          {game.awayTeam.score ? game.awayTeam.score : "-"}
        </p>
        <img src={game.awayTeam.logo} className="w-10" />
        <p>{game.awayTeam.abbrev}</p>
        {game.threeMinRecap && (
          <a
            className="ml-auto"
            href={`https://www.nhl.com${game.threeMinRecap}`}
            target="_blank"
          >
            {linkOutIcon}
          </a>
        )}
      </div>
    </div>
  );
};

export default TeamThisWeekSchedule;
