import type { TeamType } from "../Standings.tsx";
import StyledTable from "../components/StyledTable.tsx";
import { useCallback, useState } from "react";

type DivisionTableProps = {
  central: TeamType[];
  atlantic: TeamType[];
  metropolitan: TeamType[];
  pacific: TeamType[];
  headers: string[];
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

  const reverseStandings = useCallback((state: DivisionStateType) => {
    return {
      standings: state.standings.toReversed(),
      sortedBy: state.sortedBy,
    };
  }, []);

  const handleCentralSort = useCallback(
    (newStandings: TeamType[], sortBy: string) => {
      setCentralState((prevState) =>
        prevState.sortedBy === sortBy
          ? reverseStandings(prevState)
          : { standings: newStandings, sortedBy: sortBy }
      );
    },
    [setCentralState, reverseStandings]
  );

  const handleAtlanticSort = useCallback(
    (newStandings: TeamType[], sortBy: string) => {
      setAtlanticState((prevState) =>
        prevState.sortedBy === sortBy
          ? reverseStandings(prevState)
          : { standings: newStandings, sortedBy: sortBy }
      );
    },
    [setAtlanticState, reverseStandings]
  );

  const handleMetropolitanSort = useCallback(
    (newStandings: TeamType[], sortBy: string) => {
      setMetropolitanState((prevState) =>
        prevState.sortedBy === sortBy
          ? reverseStandings(prevState)
          : { standings: newStandings, sortedBy: sortBy }
      );
    },
    [setMetropolitanState, reverseStandings]
  );

  const handlePacificSort = useCallback(
    (newStandings: TeamType[], sortBy: string) => {
      setPacificState((prevState) =>
        prevState.sortedBy === sortBy
          ? reverseStandings(prevState)
          : { standings: newStandings, sortedBy: sortBy }
      );
    },
    [setPacificState, reverseStandings]
  );

  return (
    <>
      <StyledTable
        standings={centralState.standings}
        handleSort={handleCentralSort}
        headers={headers}
        tableName={"Central"}
      />
      <StyledTable
        standings={atlanticState.standings}
        handleSort={handleAtlanticSort}
        headers={headers}
        tableName={"Atlantic"}
      />
      <StyledTable
        standings={metropolitanState.standings}
        handleSort={handleMetropolitanSort}
        headers={headers}
        tableName={"Metropolitan"}
      />
      <StyledTable
        standings={pacificState.standings}
        handleSort={handlePacificSort}
        headers={headers}
        tableName={"Pacific"}
      />
    </>
  );
};

export default DivisionTable;
