import { TeamType } from "../../types";
import { checkmarkIcon, xmarkIcon } from "../../../../../svgs";

type TableRowProps = {
  team: TeamType;
  selectedTable: string;
  handleOpenModal: (team: TeamType) => void;
  tableName: string;
  idx: number;
};

const TableRow = ({
  selectedTable,
  handleOpenModal,
  tableName,
  team,
  idx,
}: TableRowProps) => {
  const playoffsIndicator = team.clinchIndicator
    ? team.clinchIndicator === "e"
      ? // If eliminated, show a red check mark
        xmarkIcon
      : // If Clinched a playoff spot, show a green check mark
        checkmarkIcon
    : "";
  return (
    <tr
      onClick={() => handleOpenModal(team)}
      role="button"
      aria-label={`View details for ${team.teamName.default}`}
      className={`font-bold hover:bg-stone-200 dark:hover:bg-stone-800 cursor-pointer select-none border-b-2 ${
        (selectedTable === "Division" && team.rank === 3) ||
        (selectedTable === "Wild Card" &&
          (tableName === "Eastern" || tableName === "Western") &&
          idx === 1)
          ? "border-lime-600 dark:border-lime-500"
          : "border-stone-300 dark:border-stone-800"
      }`}
    >
      <td className="text-center">{team.rank}</td>
      <th className="flex wrap flex-col sm:flex-row flex-wrap w-full sm:justify-start items-center sm:px-2 py-2 sm:py-3">
        <div className="flex flex-row items-center">
          <img
            src={team.teamLogo}
            className={`team-logo h-8 w-8 sm:h-12 sm:w-12 dark:hidden`}
            alt={`${team.teamName.default} logo`}
          />
          <img
            src={
              // Capitals dark logo is outdated so skip it for now
              team.teamName.default === "Washington Capitals"
                ? team.teamLogo
                : team.teamLogoDark
            }
            className={`team-logo-dark h-8 w-8 sm:h-12 sm:w-12 hidden dark:block `}
            alt={`${team.teamName.default} logo`}
          />
          <span className="sm:hidden block">{playoffsIndicator}</span>
        </div>
        <p className="hidden md:block text-center">{team.teamName.default}</p>
        <p className="sm:block md:hidden text-center">
          {team.teamAbbrev.default}
        </p>
        <span className="hidden sm:block pl-2">{playoffsIndicator}</span>
      </th>
      <td className="text-center">{team.points}</td>
      <td className="text-center">{team.gamesPlayed}</td>
      <td className="text-center">{team.wins}</td>
      <td className="text-center">{team.losses}</td>
      <td className="text-center">{team.otLosses}</td>
      <td className="text-center">{team.goalDifferential}</td>
      <td className={`text-center hidden md:table-cell`}>
        {team.l10Wins} - {team.l10Losses} - {team.l10OtLosses}
      </td>
      <td className="text-center hidden md:table-cell">
        {team.streakCode}
        {team.streakCount >= 3
          ? team.streakCode === "W"
            ? `${team.streakCount}🔥`
            : `${team.streakCount}❄️`
          : team.streakCount}
      </td>
    </tr>
  );
};

export default TableRow;
