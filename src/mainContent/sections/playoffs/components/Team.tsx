import { TeamType } from "../types";
const Team = ({ team, score }: { team: TeamType; score: number }) => {
  return (
    <>
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
      <p className="font-bold">{team.abbrev}</p>
      <p className="font-bold text-2xl ml-2">{score}</p>
    </>
  );
};

export default Team;
