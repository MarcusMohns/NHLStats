import { TeamType } from "../types";
const Team = ({
  team,
  score,
  winningTeamId,
}: {
  team: TeamType;
  score: number;
  winningTeamId?: number;
}) => {
  const opacityStyles =
    team.id === winningTeamId || winningTeamId == undefined
      ? "opacity-100"
      : "opacity-50";
  return (
    <div
      className={`flex items-center justify-center text-center w-full
        px-5 md:px-10 lg:px-6 
flex items-center justify-center text-center ${opacityStyles}`}
    >
      <img
        src={team.logo}
        alt="Team Logo"
        className="w-11 h-11 block dark:hidden"
      />
      <img
        src={team.darkLogo}
        alt="Team Logo"
        className="w-11 h-11 hidden dark:block"
      />
      <p className="dark:text-stone-200 md:text-base hidden sm:block">
        {team.abbrev}
      </p>
      <p className="font-bold text-lg dark:text-stone-200 px-1">{score}</p>
    </div>
  );
};

export default Team;
