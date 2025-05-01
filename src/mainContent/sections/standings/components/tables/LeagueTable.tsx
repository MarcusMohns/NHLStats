import { TeamType, StandingsTableType } from "../../types.ts";
import StyledTable from "./StyledTable.tsx";
import { useState, useCallback } from "react";
import {
  reverseStandings,
  sortFunctions,
} from "../../../../../utility/sortFunctions.ts";
import startViewTransitionWrapper from "../../../../../utility/startViewTransitionWrapper.ts";

type LeagueTablePropTypes = {
  league: TeamType[];
  selectedTable: string;
};

const LeagueTable = ({ league, selectedTable }: LeagueTablePropTypes) => {
  const [leagueState, setLeagueState] = useState<StandingsTableType>({
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
      tableName={"League"}
      selectedTable={selectedTable}
    />
  );
};

export default LeagueTable;
