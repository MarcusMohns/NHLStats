import { GameType } from "./TeamStatsModal";
import { linkOutIcon } from "../../../components/svgs";

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
      <p className="date self-start min-w-25">{game.gameDate}</p>
      <div className="match w-full flex flex-row self-center justify-center align-center">
        <div className="team flex flex-row">
          <p className="team-name">{game.homeTeam.abbrev}</p>
          <img src={game.homeTeam.logo} className="w-10" />
          <p className="home-team-score">
            {game.homeTeam.score ? game.homeTeam.score : "-"}
          </p>
        </div>
        <p className="mx-2">vs</p>
        <div className="team flex flex-row">
          <p className="">{game.awayTeam.score ? game.awayTeam.score : "-"}</p>
          <img src={game.awayTeam.logo} className="w-10" />
          <p>{game.awayTeam.abbrev}</p>
        </div>
      </div>
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
  );
};

export default TeamThisWeekSchedule;
