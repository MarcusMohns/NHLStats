import type { TeamType } from "../../types.ts";
import StyledTable from "./StyledTable.tsx";
import { useState, useCallback, Dispatch, SetStateAction } from "react";
import {
  reverseStandings,
  sortFunctions,
} from "../../../../../utility/sortFunctions.ts";
import startViewTransitionWrapper from "../../../../../utility/startViewTransitionWrapper.ts";
import { StandingsTableType } from "../../types.ts";

type ConferenceTableProps = {
  eastern: TeamType[];
  western: TeamType[];
  selectedTable: string;
};

const ConferenceTable = ({
  eastern,
  western,
  selectedTable,
}: ConferenceTableProps) => {
  const [easternState, setEasternState] = useState<StandingsTableType>({
    standings: eastern,
    sortedBy: "Points",
  });
  const [westernState, setWesternState] = useState<StandingsTableType>({
    standings: western,
    sortedBy: "Points",
  });

  const handleSort = useCallback(
    (oldStandings: TeamType[], sortBy: string, argument: string) => {
      const newStandings = sortFunctions[sortBy](oldStandings);
      // Sort newStandings by sortBy argument
      let stateSetter: Dispatch<SetStateAction<StandingsTableType>> | undefined;
      switch (argument) {
        // Set which state is to be updated
        case "Western":
          stateSetter = setWesternState;
          break;
        case "Eastern":
          stateSetter = setEasternState;
          break;
        default:
          throw new Error(`Invalid argument: ${argument}`);
      }

      startViewTransitionWrapper(() =>
        // Set selected state to the new sorted standings
        stateSetter((prevState) =>
          prevState.sortedBy === sortBy
            ? reverseStandings(prevState)
            : { standings: newStandings, sortedBy: sortBy }
        )
      );
    },
    [setEasternState, setWesternState]
  );

  return (
    <>
      <StyledTable
        standings={easternState.standings}
        tableName={"Eastern"}
        aria-label="Eastern Conference Standings Table"
        handleSort={handleSort}
        selectedTable={selectedTable}
      />
      <StyledTable
        standings={westernState.standings}
        tableName={"Western"}
        aria-label="Western Conference Standings Table"
        handleSort={handleSort}
        selectedTable={selectedTable}
      />
    </>
  );
};

export default ConferenceTable;
