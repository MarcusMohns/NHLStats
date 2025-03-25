import type { TeamType } from "../Standings.tsx";
import StyledTable from "../components/StyledTable.tsx";
import { useState, useCallback } from "react";
import {
  reverseStandings,
  sortFunctions,
} from "../../utility/sortFunctions.ts";
import startViewTransitionWrapper from "../../utility/startViewTransitionWrapper.ts";

type LeagueTablePropTypes = {
  league: TeamType[];
  headers: { full: string[]; abbreviated: string[] };
  selectedStandings: string;
  handleOpenModal: (team: TeamType) => void;
};
type LeagueStateType = {
  standings: TeamType[];
  sortedBy: String;
};
const LeagueTable = ({
  league,
  headers,
  selectedStandings,
  handleOpenModal,
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
      selectedStandings={selectedStandings}
      handleOpenModal={handleOpenModal}
    />
  );
};

export default LeagueTable;
