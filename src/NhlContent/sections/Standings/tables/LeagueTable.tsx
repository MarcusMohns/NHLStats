import type { TeamType } from "../Standings.tsx";
import StyledTable from "../components/StyledTable.tsx";
import { useState, useCallback } from "react";
import {
  reverseStandings,
  sortFunctions,
} from "../../utility/sortFunctions.ts";

type LeagueTableProps = {
  league: TeamType[];
  headers: { full: string[]; abbreviated: string[] };
  selectedStandings: string;
};
type LeagueStateType = {
  standings: TeamType[];
  sortedBy: String;
};
const LeagueTable = ({
  league,
  headers,
  selectedStandings,
}: LeagueTableProps) => {
  const [leagueState, setLeagueState] = useState<LeagueStateType>({
    standings: league,
    sortedBy: "Points",
  });

  const handleSort = useCallback(
    (argument: string, oldStandings: TeamType[], sortBy: string) => {
      const newStandings = sortFunctions[sortBy](oldStandings);
      setLeagueState((prevState) =>
        prevState.sortedBy === sortBy
          ? reverseStandings(prevState)
          : { standings: newStandings, sortedBy: sortBy }
      );
    },
    [setLeagueState]
  );

  return (
    <StyledTable
      standings={leagueState.standings}
      handleSort={handleSort}
      headers={headers}
      tableName={"League"}
      selectedStandings={selectedStandings}
    />
  );
};

export default LeagueTable;
