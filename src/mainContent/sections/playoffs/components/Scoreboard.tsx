import { TeamType } from "../types";
import Team from "./Team.tsx";

type ScoreboardProps = {
  awayTeam: TeamType;
  homeTeam: TeamType;
  awayTeamScore: number;
  homeTeamScore: number;
};

const Scoreboard = ({
  awayTeam,
  homeTeam,
  awayTeamScore,
  homeTeamScore,
}: ScoreboardProps) => {
  return (
    <div className="flex flex-col items-center justify-center m-auto h-full p-3 px-5 text-center grow bg-stone-100 dark:bg-stone-800 rounded-lg border-2 border-gray-300 dark:border-stone-700">
      <div className="flex flex-col w-full sm:flex-row items-center justify-center text-center border-b-2 border-gray-300 dark:border-stone-700">
        <Team score={homeTeamScore} team={homeTeam} />
      </div>
      <div className="flex flex-col  sm:flex-row items-center justify-center text-center">
        <Team score={awayTeamScore} team={awayTeam} />
      </div>
    </div>
  );
};

export default Scoreboard;
