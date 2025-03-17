import type { StandingsType } from "../Standings.tsx";
import StyledTable from "../components/StyledTable.tsx";
import { useState } from "react";

type LeagueTableProps = {
  standings: StandingsType[];
  headers: string[];
};
const LeagueTable = ({ standings, headers }: LeagueTableProps) => {
  const [leagueState, setLeagueState] = useState<StandingsType[]>(standings);
  const [sortedBy, setSortedBy] = useState<string>("Points");

  const handleLeagueSort = (newState: StandingsType[], sortBy: string) => {
    if (sortedBy === sortBy) {
      setLeagueState(leagueState.toReversed());
    } else {
      setSortedBy(sortBy);
      setLeagueState(newState);
    }
  };

  return (
    <StyledTable
      standings={leagueState}
      handleSort={handleLeagueSort}
      headers={headers}
      title={"League"}
    />
  );
};

export default LeagueTable;
