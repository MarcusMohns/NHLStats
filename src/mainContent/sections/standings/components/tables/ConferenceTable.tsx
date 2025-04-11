import type { TeamType } from "../../store.tsx";
import StyledTable from "./StyledTable.tsx";
import { useState, useCallback, Dispatch, SetStateAction } from "react";
import {
  reverseStandings,
  sortFunctions,
} from "../../../../../utility/sortFunctions.ts";
import startViewTransitionWrapper from "../../../../../utility/startViewTransitionWrapper.ts";

type ConferenceTablePropTypes = {
  eastern: TeamType[];
  western: TeamType[];
  headers: { full: string[]; abbreviated: string[] };
  selectedTable: string;
};

type ConferenceStateType = {
  standings: TeamType[];
  sortedBy: String;
};

const ConferenceTable = ({
  eastern,
  western,
  headers,
  selectedTable,
}: ConferenceTablePropTypes) => {
  const [easternState, setEasternState] = useState<ConferenceStateType>({
    standings: eastern,
    sortedBy: "Points",
  });
  const [westernState, setWesternState] = useState<ConferenceStateType>({
    standings: western,
    sortedBy: "Points",
  });

  const handleSort = useCallback(
    (oldStandings: TeamType[], sortBy: string, argument: string) => {
      const newStandings = sortFunctions[sortBy](oldStandings);
      // Sort newStandings by sortBy argument
      let stateSetter:
        | Dispatch<SetStateAction<ConferenceStateType>>
        | undefined;
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
    [setEasternState, setWesternState, reverseStandings]
  );

  const tableProps = {
    handleSort,
    headers,
    selectedTable,
  };

  return (
    <>
      <StyledTable
        standings={easternState.standings}
        tableName={"Eastern"}
        {...tableProps}
      />
      <StyledTable
        standings={westernState.standings}
        tableName={"Western"}
        {...tableProps}
      />
    </>
  );
};

export default ConferenceTable;
