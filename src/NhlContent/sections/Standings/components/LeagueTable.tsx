import type { StandingsType } from "../Standings.tsx";

type LeagueTableProps = {
  standings: StandingsType[];
  headers: string[];
};
const LeagueTable = ({ standings, headers }: LeagueTableProps) => {
  return (
    <table
      className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      cellSpacing="5"
    >
      <thead className="bg-gray-200">
        <tr>
          {headers.map((header) => (
            <th className="text-center p-2" key={header}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {standings.map((standing) => (
          <tr
            key={standing.teamAbbrev.default}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
          >
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
              {standing.l10Wins} - {standing.l10Losses} - {standing.l10OtLosses}
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
  );
};

export default LeagueTable;
