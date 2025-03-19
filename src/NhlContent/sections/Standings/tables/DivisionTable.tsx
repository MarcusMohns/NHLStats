import type { TeamType } from "../Standings.tsx";
import StyledTable from "../components/StyledTable.tsx";
import { useCallback, useState, SetStateAction, Dispatch } from "react";
import { reverseStandings } from "../../utility/sortFunctions.ts";

type DivisionTableProps = {
  central: TeamType[];
  atlantic: TeamType[];
  metropolitan: TeamType[];
  pacific: TeamType[];
  headers: string[];
  selectedStandings: string;
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
  selectedStandings,
}: DivisionTableProps) => {
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
    (argument: string, newStandings: TeamType[], sortBy: string) => {
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
      stateSetter((prevState) =>
        prevState.sortedBy === sortBy
          ? reverseStandings(prevState)
          : { standings: newStandings, sortedBy: sortBy }
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

  return (
    <>
      <StyledTable
        standings={centralState.standings}
        handleSort={handleSort}
        headers={headers}
        tableName={"Central"}
        selectedStandings={selectedStandings}
      />
      <StyledTable
        standings={atlanticState.standings}
        handleSort={handleSort}
        headers={headers}
        tableName={"Atlantic"}
        selectedStandings={selectedStandings}
      />
      <StyledTable
        standings={metropolitanState.standings}
        handleSort={handleSort}
        headers={headers}
        tableName={"Metropolitan"}
        selectedStandings={selectedStandings}
      />
      <StyledTable
        standings={pacificState.standings}
        handleSort={handleSort}
        headers={headers}
        tableName={"Pacific"}
        selectedStandings={selectedStandings}
      />
    </>
  );
};

export default DivisionTable;
