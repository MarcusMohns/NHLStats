import type { TeamType } from "../../store.tsx";
import StyledTable from "./StyledTable.tsx";
import { useState, useCallback } from "react";
import {
  reverseStandings,
  sortFunctions,
} from "../../../../../utility/sortFunctions.ts";
import startViewTransitionWrapper from "../../../../../utility/startViewTransitionWrapper.ts";

type LeagueTablePropTypes = {
  league: TeamType[];
  headers: { full: string[]; abbreviated: string[] };
  selectedTable: string;
};
type LeagueStateType = {
  standings: TeamType[];
  sortedBy: String;
};
const LeagueTable = ({
  league,
  headers,
  selectedTable,
}: LeagueTablePropTypes) => {
  const [leagueState, setLeagueState] = useState<LeagueStateType>({
    standings: league,
    sortedBy: "Points",
  });

  const handleSort = useCallback(
    (oldStandings: TeamType[], sortBy: string) => {
      const newStandings = sortFunctions[sortBy](oldStandings);
      startViewTransitionWrapper(() =>
        setLeagueState((prevState) =>
          prevState.sortedBy === sortBy
            ? reverseStandings(prevState)
            : { standings: newStandings, sortedBy: sortBy }
        )
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
      selectedTable={selectedTable}
    />
  );
};

export default LeagueTable;
