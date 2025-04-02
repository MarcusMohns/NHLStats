import type { TeamType } from "../Standings.tsx";
import StyledTable from "../components/StyledTable.tsx";
import { useCallback, useState, SetStateAction, Dispatch } from "react";
import {
  reverseStandings,
  sortFunctions,
} from "../../utility/sortFunctions.ts";
import startViewTransitionWrapper from "../../utility/startViewTransitionWrapper.ts";

type DivisionTablePropTypes = {
  central: TeamType[];
  atlantic: TeamType[];
  metropolitan: TeamType[];
  pacific: TeamType[];
  headers: { full: string[]; abbreviated: string[] };
  selectedTable: string;
  handleOpenModal: (team: TeamType) => void;
};

type DivisionStateType = {
  standings: TeamType[];
  sortedBy: String;
};

const DivisionTable = ({
  central,
  atlantic,
  metropolitan,
  pacific,
  headers,
  selectedTable,
  handleOpenModal,
}: DivisionTablePropTypes) => {
  const [centralState, setCentralState] = useState<DivisionStateType>({
    standings: central,
    sortedBy: "Points",
  });
  const [atlanticState, setAtlanticState] = useState<DivisionStateType>({
    standings: atlantic,
    sortedBy: "Points",
  });
  const [metropolitanState, setMetropolitanState] = useState<DivisionStateType>(
    {
      standings: metropolitan,
      sortedBy: "Points",
    }
  );
  const [pacificState, setPacificState] = useState<DivisionStateType>({
    standings: pacific,
    sortedBy: "Points",
  });

  const handleSort = useCallback(
    (oldStandings: TeamType[], sortBy: string, argument: string) => {
      const newStandings = sortFunctions[sortBy](oldStandings);
      let stateSetter: Dispatch<SetStateAction<DivisionStateType>> | undefined;
      switch (argument) {
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
        stateSetter((prevState) =>
          prevState.sortedBy === sortBy
            ? reverseStandings(prevState)
            : { standings: newStandings, sortedBy: sortBy }
        )
      );
    },
    [
      reverseStandings,
      setCentralState,
      setAtlanticState,
      setMetropolitanState,
      setPacificState,
    ]
  );

  const tableProps = {
    handleSort,
    headers,
    selectedTable,
    handleOpenModal,
  };

  return (
    <>
      <StyledTable
        standings={centralState.standings}
        tableName={"Central"}
        {...tableProps}
      />
      <StyledTable
        standings={atlanticState.standings}
        tableName={"Atlantic"}
        {...tableProps}
      />
      <StyledTable
        standings={metropolitanState.standings}
        tableName={"Metropolitan"}
        {...tableProps}
      />
      <StyledTable
        standings={pacificState.standings}
        tableName={"Pacific"}
        {...tableProps}
      />
    </>
  );
};

export default DivisionTable;
