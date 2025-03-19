import type { TeamType } from "../Standings.tsx";
import {
  sortByRank,
  sortByGamesPlayed,
  sortByPoints,
  sortByWins,
  sortByLosses,
  sortByOTLosses,
  sortByGoalDifferential,
  sortByLast10,
  sortByStreak,
} from "../../utility/sortFunctions.ts";

type StyledTableProps = {
  standings: TeamType[];
  handleSort: (argument: string, newState: TeamType[], sortBy: string) => void;
  headers: string[];
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
  const handleSortByHeader = (header: string) => {
    switch (header) {
      case "Rank":
        return handleSort(tableName, sortByRank(standings), header);
      case "Games Played":
        return handleSort(tableName, sortByGamesPlayed(standings), header);
      case "Points":
        return handleSort(tableName, sortByPoints(standings), header);
      case "Wins":
        return handleSort(tableName, sortByWins(standings), header);
      case "Losses":
        return handleSort(tableName, sortByLosses(standings), header);
      case "OT Losses":
        return handleSort(tableName, sortByOTLosses(standings), header);
      case "Diff":
        return handleSort(tableName, sortByGoalDifferential(standings), header);
      case "L10":
        return handleSort(tableName, sortByLast10(standings), header);
      case "Streak":
        return handleSort(tableName, sortByStreak(standings), header);
      default:
        return standings;
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
            {headers.map((header) => (
              <th className="text-center p-2" key={header}>
                {header === "Team" ? (
                  header
                ) : (
                  <button
                    className="outline cursor-pointer"
                    onClick={() => handleSortByHeader(header)}
                  >
                    {header}
                  </button>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {standings.map((standing, idx) => (
            <tr
              key={standing.teamAbbrev.default}
              className={`bg-white dark:bg-gray-800  border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer ${
                // 3rd place or up in the division qualifies you to the playoffs
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
              <th className="flex items-center px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <img
                  src={standing.teamLogo}
                  className="w-12 mx-2"
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
              <td className="text-center">
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
