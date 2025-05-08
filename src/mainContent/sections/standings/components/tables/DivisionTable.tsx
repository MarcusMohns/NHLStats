import type { TeamType } from "../../types.tsx";
import StyledTable from "./StyledTable.tsx";
import { useCallback, useState, SetStateAction, Dispatch } from "react";
import {
  reverseStandings,
  sortFunctions,
} from "../../../../../utility/sortFunctions.ts";
import startViewTransitionWrapper from "../../../../../utility/startViewTransitionWrapper.ts";
import { StandingsTableType } from "../../types.tsx";

type DivisionTablePropTypes = {
  central: TeamType[];
  atlantic: TeamType[];
  metropolitan: TeamType[];
  pacific: TeamType[];
  selectedTable: string;
};

const DivisionTable = ({
  central,
  atlantic,
  metropolitan,
  pacific,
  selectedTable,
}: DivisionTablePropTypes) => {
  const [centralState, setCentralState] = useState<StandingsTableType>({
    standings: central,
    sortedBy: "Points",
  });
  const [atlanticState, setAtlanticState] = useState<StandingsTableType>({
    standings: atlantic,
    sortedBy: "Points",
  });
  const [metropolitanState, setMetropolitanState] =
    useState<StandingsTableType>({
      standings: metropolitan,
      sortedBy: "Points",
    });
  const [pacificState, setPacificState] = useState<StandingsTableType>({
    standings: pacific,
    sortedBy: "Points",
  });

  const handleSort = useCallback(
    (oldStandings: TeamType[], sortBy: string, argument: string) => {
      const newStandings = sortFunctions[sortBy](oldStandings);
      // Sort newStandings by sortBy argument
      let stateSetter: Dispatch<SetStateAction<StandingsTableType>> | undefined;
      switch (argument) {
        // Set which state is to be updated
        case "Central":
          stateSetter = setCentralState;
          break;
        case "Atlantic":
          stateSetter = setAtlanticState;
          break;
        case "Metropolitan":
          stateSetter = setMetropolitanState;
          break;
        case "Pacific":
          stateSetter = setPacificState;
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
    [setCentralState, setAtlanticState, setMetropolitanState, setPacificState]
  );

  return (
    <>
      <StyledTable
        standings={centralState.standings}
        tableName={"Central"}
        handleSort={handleSort}
        selectedTable={selectedTable}
        aria-label="Central Division Standings Table"
      />
      <StyledTable
        standings={atlanticState.standings}
        tableName={"Atlantic"}
        handleSort={handleSort}
        selectedTable={selectedTable}
        aria-label="Atlantic Division Standings Table"
      />
      <StyledTable
        standings={metropolitanState.standings}
        tableName={"Metropolitan"}
        handleSort={handleSort}
        selectedTable={selectedTable}
        aria-label="Metropolitan Division Standings Table"
      />
      <StyledTable
        standings={pacificState.standings}
        tableName={"Pacific"}
        handleSort={handleSort}
        selectedTable={selectedTable}
        aria-label="Pacific Division Standings Table"
      />
    </>
  );
};

export default DivisionTable;
