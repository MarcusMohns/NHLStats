import { TeamType } from "../types";
import Team from "./Team.tsx";

type ScoreboardProps = {
  awayTeam: TeamType;
  homeTeam: TeamType;
  awayTeamScore: number;
  homeTeamScore: number;
  winningTeamId: number | undefined;
  url: string;
};

const Scoreboard = ({
  awayTeam,
  homeTeam,
  awayTeamScore,
  homeTeamScore,
  winningTeamId,
  url,
}: ScoreboardProps) => {
  return (
    <a
      className="flex flex-col lg:border-1 bg-stone-100 dark:bg-stone-800 border-gray-300 dark:border-stone-700 rounded-lg 
      w-full h-auto px-1 lg:px-3 py-2 hover:border-stone-500 cursor-pointer"
      href={`https://www.nhl.com${url}`}
      target="_blank"
      aria-label={`Detailed Game Information for ${homeTeam.name} vs ${awayTeam.name}`}
      rel="noopener noreferrer"
    >
      <div className="border-b-2 border-gray-300 dark:border-stone-700">
        <Team
          score={homeTeamScore}
          team={homeTeam}
          winningTeamId={winningTeamId}
        />
      </div>
      <div>
        <Team
          score={awayTeamScore}
          team={awayTeam}
          winningTeamId={winningTeamId}
        />
      </div>
    </a>
  );
};

export default Scoreboard;
