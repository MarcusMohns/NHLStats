import type { TeamType } from "../Standings.tsx";
import { useRef } from "react";

type StyledTableProps = {
  standings: TeamType[];
  handleSort: (
    oldStandings: TeamType[],
    sortBy: string,
    argument: string
  ) => void;
  headers: { full: string[]; abbreviated: string[] };
  tableName: string;
  selectedTable: string;
  handleOpenModal: (team: TeamType) => void;
};
const StyledTable = ({
  standings,
  headers,
  tableName,
  handleSort,
  selectedTable,
  handleOpenModal,
}: StyledTableProps) => {
  const tooltipRefs = useRef<Array<HTMLDialogElement | null>>([]);
  const toggleTooltip = (argument: string, idx: number) => {
    if (tooltipRefs.current[idx] !== null) {
      argument === "show"
        ? tooltipRefs.current[idx].show()
        : tooltipRefs.current[idx].close();
    }
  };
  return (
    <>
      <h2 className="font-bold dark:text-stone-300 my-5 pt-3 px-1 text-xl uppercase leading-tight tracking-wide dark:border-stone-600">
        {tableName}
      </h2>
      <table
        className="dark:bg-stone-900 shadow-lg w-full text-sm text-left rtl:text-right"
        cellSpacing="5"
      >
        <thead className="bg-gray-300 dark:bg-stone-800">
          <tr>
            {headers.full.map((header, idx) => (
              <th
                key={header}
                className={`text-stone-400 dark:text-stone-300 text-center p-2 relative select-none ${
                  header === "Last 10" ? "hidden md:table-cell" : ""
                }`}
              >
                <button
                  className="cursor-pointer"
                  onClick={() => handleSort(standings, header, tableName)}
                  onMouseOver={() => toggleTooltip("show", idx)}
                  onMouseOut={() => toggleTooltip("close", idx)}
                >
                  {/* Show full sized header on larger screens, abbreviated on smaller */}
                  <p className="hidden lg:block">{header}</p>
                  <p className="sm:block lg:hidden">
                    {headers.abbreviated[idx]}
                  </p>
                </button>
                <dialog
                  ref={(el) => {
                    tooltipRefs.current[idx] = el;
                  }}
                  className="sm:inherited lg:hidden bg-gray-802000 border border-gray-200 rounded-sm p-2 text-black m-auto"
                >
                  <p>{header}</p>
                </dialog>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="font-medium">
          {standings.map((team, idx) => (
            // render all the teams in the standings
            <tr
              key={team.teamAbbrev.default}
              onClick={() => handleOpenModal(team)}
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
              <th className="flex flex-col sm:flex-row flex-wrap w-full sm:justify-start items-center sm:px-2 py-2 sm:py-3 w-fit">
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
                <p className="hidden md:block text-center">
                  {team.teamName.default}
                </p>
                <p className="sm:block md:hidden text-center">
                  {team.teamCommonName.default}
                </p>
                {team.clinchIndicator === "x"
                  ? "✔️"
                  : team.clinchIndicator === "e"
                  ? "❌"
                  : ""}
              </th>
              <td className="text-center">{team.points}</td>
              <td className="text-center">{team.gamesPlayed}</td>
              <td className="text-center">{team.wins}</td>
              <td className="text-center">{team.losses}</td>
              <td className="text-center">{team.otLosses}</td>
              <td className="text-center">{team.goalDifferential}</td>
              <td
                className={`text-center hidden md:table-cell vertical-align: center`}
              >
                {team.l10Wins} - {team.l10Losses} - {team.l10OtLosses}
              </td>
              <td className="text-center">
                {team.streakCode}
                {team.streakCount >= 3
                  ? team.streakCode === "W"
                    ? `${team.streakCount}🔥`
                    : `${team.streakCount}❄️`
                  : team.streakCount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default StyledTable;
