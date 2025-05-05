import { TeamType } from "../types";

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
    <div>
      <div className="flex flex-row items-center justify-center w-max border-b border-stone-300 dark:border-stone-700">
        <img src={homeTeam.logo} alt="Home Team Logo" className="w-8 h-8" />
        <p>{homeTeam.abbrev}</p>
        <p className="text-lg text-stone-900 dark:text-stone-100">
          {homeTeamScore}
        </p>
      </div>
      <div className="flex flex-row items-center justify-center">
        <img src={awayTeam.logo} alt="Away Team Logo" className="w-8 h-8" />
        {awayTeam.abbrev} {awayTeamScore}
      </div>
    </div>
  );
};

export default Scoreboard;
