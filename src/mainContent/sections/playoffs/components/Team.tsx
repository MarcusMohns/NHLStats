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
      : "opacity-40";
  return (
    <div
      className={`flex items-center justify-center
        px-3 ${opacityStyles}`}
    >
      <img
        src={team.logo}
        alt={`${team.name} Logo`}
        className="w-11 h-11 block dark:hidden"
      />
      <img
        src={team.darkLogo}
        alt={`${team.name} Logo`}
        className="w-11 h-11 hidden dark:block"
      />
      <p className="font-bold tracking-wide leading-tight dark:text-stone-200 md:text-base text-xs">
        {team.abbrev}
      </p>
      <p className="font-bold text-lg dark:text-stone-200 px-1">{score}</p>
    </div>
  );
};

export default Team;
