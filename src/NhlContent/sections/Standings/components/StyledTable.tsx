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
};
const StyledTable = ({
  standings,
  headers,
  tableName,
  handleSort,
  selectedStandings,
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
      <h2 className="m-4 mx-2 text-2xl font-bold uppercase leading-none tracking-tight">
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
                  // className="sm:inherited lg:hidden bg-gray-802000 border border-gray-200 rounded-sm p-2 text-black m-auto"
                  className="dialog bg-gray-802000 border border-gray-200 rounded-sm p-2 text-black m-auto"
                >
                  <p>{header}</p>
                </dialog>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {standings.map((standing, idx) => (
            <tr
              key={standing.teamAbbrev.default}
              className={`bg-white dark:bg-gray-800  border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer ${
                // 3rd place or up in the division qualifies you to the playoffs so add a border for them
                selectedStandings === "Division" &&
                standing.rank === 3 &&
                "border-b border-lime-500"
              } ${
                selectedStandings === "Wild Card" &&
                (tableName === "Eastern" || tableName === "Western") &&
                idx === 1 &&
                "border-b border-lime-500"
              } 
         `}
            >
              <td className="text-center">{standing.rank}</td>
              <th className="flex items-center px-2 py-3 font-medium text-gray-900 dark:text-white">
                <img
                  src={standing.teamLogo}
                  className="w-10 mr-2"
                  alt={`${standing.teamName.default} logo`}
                />
                {standing.teamName.default}
              </th>
              <td className="text-center">{standing.points}</td>
              <td className="text-center">{standing.gamesPlayed}</td>
              <td className="text-center">{standing.wins}</td>
              <td className="text-center">{standing.losses}</td>
              <td className="text-center">{standing.otLosses}</td>
              <td className="text-center">{standing.goalDifferential}</td>
              <td
                className={`text-center hidden md:table-cell vertical-align: center`}
              >
                {standing.l10Wins} - {standing.l10Losses} -{" "}
                {standing.l10OtLosses}
              </td>
              <td className="text-center">
                {standing.streakCode}
                {standing.streakCount >= 3
                  ? standing.streakCode === "W"
                    ? `${standing.streakCount}🔥`
                    : `${standing.streakCount}❄️`
                  : standing.streakCount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default StyledTable;
