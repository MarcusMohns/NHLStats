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
  selectedStandings: string;
  handleOpenModal: (team: TeamType) => void;
};
const StyledTable = ({
  standings,
  headers,
  tableName,
  handleSort,
  selectedStandings,
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
      <h2 className="m-2 border-y-2 border-gray-400 py-1 px-2 text-2xl font-bold uppercase leading-tight tracking-wide text-gray-800">
        {tableName}
      </h2>
      <table
        className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
        cellSpacing="5"
      >
        <thead className="bg-gray-200">
          <tr>
            {headers.full.map((header, idx) => (
              <th
                key={header}
                className={`text-center p-2 relative ${
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
        <tbody>
          {standings.map((team, idx) => (
            // render all the teams in the standings
            <tr
              key={team.teamAbbrev.default}
              onClick={() => handleOpenModal(team)}
              className={`bg-white dark:bg-gray-800  border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer ${
                // 3rd place or up in the division qualifies you to the playoffs so add a border for them
                selectedStandings === "Division" &&
                team.rank === 3 &&
                "border-b border-lime-500"
              } ${
                selectedStandings === "Wild Card" &&
                (tableName === "Eastern" || tableName === "Western") &&
                idx === 1 &&
                "border-b border-lime-500"
              } 
         `}
            >
              <td className="text-center">{team.rank}</td>
              <th className="flex items-center px-2 py-3 font-medium text-gray-900 dark:text-white">
                <img
                  src={team.teamLogo}
                  className="w-10 mr-2"
                  alt={`${team.teamName.default} logo`}
                />
                {team.teamName.default}
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
