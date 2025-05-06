import { TeamType } from "../types";
import Team from "./Team.tsx";

type ScoreboardProps = {
  awayTeam: TeamType;
  homeTeam: TeamType;
  awayTeamScore: number;
  homeTeamScore: number;
  winningTeamId: number | undefined;
};

const Scoreboard = ({
  awayTeam,
  homeTeam,
  awayTeamScore,
  homeTeamScore,
  winningTeamId,
}: ScoreboardProps) => {
  return (
    <div className="flex flex-col border-2 bg-stone-100 dark:bg-stone-800 border-gray-300 dark:border-stone-700 rounded w-full h-auto">
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
    </div>
  );
};

export default Scoreboard;
