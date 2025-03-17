import type { StandingsType } from "../Standings.tsx";
import {
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
  standings: StandingsType[];
  handleSort: (newState: StandingsType[], sortBy: string) => void;
  headers: string[];
  title: string;
};
const StyledTable = ({
  standings,
  headers,
  title,
  handleSort,
}: StyledTableProps) => {
  const handleSortByHeader = (header: string) => {
    switch (header) {
      case "Games Played":
        return handleSort(sortByGamesPlayed(standings), header);
      case "Points":
        return handleSort(sortByPoints(standings), header);
      case "Wins":
        return handleSort(sortByWins(standings), header);
      case "Losses":
        return handleSort(sortByLosses(standings), header);
      case "OT Losses":
        return handleSort(sortByOTLosses(standings), header);
      case "Diff":
        return handleSort(sortByGoalDifferential(standings), header);
      case "L10":
        return handleSort(sortByLast10(standings), header);
      case "Streak":
        return handleSort(sortByStreak(standings), header);
      default:
        return standings;
    }
  };

  return (
    <>
      <h2 className="m-4 mx-2 text-2xl font-bold uppercase leading-none tracking-tight">
        {title}
      </h2>
      <table
        className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
        cellSpacing="5"
      >
        <thead className="bg-gray-200">
          <tr>
            {headers.map((header) => (
              <th className="text-center p-2" key={header}>
                {header === "Team" || header === "Rank" ? (
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
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
            >
              <td className="text-center">{idx + 1}</td>
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
