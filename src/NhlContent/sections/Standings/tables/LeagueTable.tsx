import type { TeamType } from "../Standings.tsx";
import StyledTable from "../components/StyledTable.tsx";
import { useState, useCallback } from "react";

type LeagueTableProps = {
  league: TeamType[];
  headers: string[];
};
type LeagueStateType = {
  standings: TeamType[];
  sortedBy: String;
};
const LeagueTable = ({ league, headers }: LeagueTableProps) => {
  const [leagueState, setLeagueState] = useState<LeagueStateType>({
    standings: league,
    sortedBy: "Points",
  });

  const handleLeagueSort = useCallback(
    (newState: TeamType[], sortBy: string) => {
      setLeagueState((prevState) =>
        prevState.sortedBy === sortBy
          ? { ...prevState, standings: prevState.standings.toReversed() }
          : { standings: newState, sortedBy: sortBy }
      );
    },
    [setLeagueState]
  );

  return (
    <StyledTable
      standings={leagueState.standings}
      handleSort={handleLeagueSort}
      headers={headers}
      tableName={"League"}
    />
  );
};

export default LeagueTable;
