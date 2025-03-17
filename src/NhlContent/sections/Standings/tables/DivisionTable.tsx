import type { StandingsType } from "../Standings.tsx";
import StyledTable from "../components/StyledTable.tsx";
import { useState } from "react";

type DivisionTableProps = {
  central: StandingsType[];
  atlantic: StandingsType[];
  metropolitan: StandingsType[];
  pacific: StandingsType[];
  headers: string[];
};

const DivisionTable = ({
  central,
  atlantic,
  metropolitan,
  pacific,
  headers,
}: DivisionTableProps) => {
  // todo create usereducer prolly
  const [centralState, setCentralState] = useState<StandingsType[]>(central);
  const [atlanticState, setAtlanticState] = useState<StandingsType[]>(atlantic);
  const [metropolitanState, setMetropolitanState] =
    useState<StandingsType[]>(metropolitan);
  const [pacificState, setPacificState] = useState<StandingsType[]>(pacific);

  const [centralSortedBy, setCentralSortedBy] = useState<string>("Points");
  const [atlanticSortedBy, setAtlanticSortedBy] = useState<string>("Points");
  const [metropolitanSortedBy, setMetropolitanSortedBy] =
    useState<string>("Points");
  const [pacificSortedBy, setPacificSortedBy] = useState<string>("Points");

  const handleCentralSort = (newState: StandingsType[], sortBy: string) => {
    if (centralSortedBy === sortBy) {
      setCentralState(centralState.toReversed());
    } else {
      setCentralSortedBy(sortBy);
      setCentralState(newState);
    }
  };

  const handleAtlanticSort = (newState: StandingsType[], sortBy: string) => {
    if (atlanticSortedBy === sortBy) {
      setAtlanticState(atlanticState.toReversed());
    } else {
      setAtlanticSortedBy(sortBy);
      setAtlanticState(newState);
    }
  };

  const handleMetropolitanSort = (
    newState: StandingsType[],
    sortBy: string
  ) => {
    if (metropolitanSortedBy === sortBy) {
      setMetropolitanState(metropolitanState.toReversed());
    } else {
      setMetropolitanSortedBy(sortBy);
      setMetropolitanState(newState);
    }
  };

  const handlePacificSort = (newState: StandingsType[], sortBy: string) => {
    if (pacificSortedBy === sortBy) {
      setPacificState(pacificState.toReversed());
    } else {
      setPacificSortedBy(sortBy);
      setPacificState(newState);
    }
  };

  return (
    <>
      <StyledTable
        standings={centralState}
        handleSort={handleCentralSort}
        headers={headers}
        title={"Central"}
      />
      <StyledTable
        standings={atlanticState}
        handleSort={handleAtlanticSort}
        headers={headers}
        title={"Atlantic"}
      />
      <StyledTable
        standings={metropolitanState}
        handleSort={handleMetropolitanSort}
        headers={headers}
        title={"Metropolitan"}
      />
      <StyledTable
        standings={pacificState}
        handleSort={handlePacificSort}
        headers={headers}
        title={"Pacific"}
      />
    </>
  );
};

export default DivisionTable;
