import type { StandingsType } from "../Standings.tsx";
import StyledTable from "../components/StyledTable.tsx";
import { useState } from "react";

type ConferenceTableProps = {
  eastern: StandingsType[];
  western: StandingsType[];
  headers: string[];
};

const ConferenceTable = ({
  eastern,
  western,
  headers,
}: ConferenceTableProps) => {
  const [easternState, setEasternState] = useState<StandingsType[]>(eastern);
  const [westernState, setWesternState] = useState<StandingsType[]>(western);

  const [easternSortedBy, setEasternSortedBy] = useState<string>("Points");
  const [westernSortedBy, setWesternSortedBy] = useState<string>("Points");

  const handleEasternSort = (newState: StandingsType[], sortBy: string) => {
    if (easternSortedBy === sortBy) {
      setEasternState(easternState.toReversed());
    } else {
      setEasternSortedBy(sortBy);
      setEasternState(newState);
    }
  };
  const handleWesternSort = (newState: StandingsType[], sortBy: string) => {
    if (westernSortedBy === sortBy) {
      setWesternState(westernState.toReversed());
    } else {
      setWesternSortedBy(sortBy);
      setWesternState(newState);
    }
  };

  return (
    <>
      <StyledTable
        standings={easternState}
        handleSort={handleEasternSort}
        headers={headers}
        title={"Eastern"}
      />
      <StyledTable
        standings={westernState}
        handleSort={handleWesternSort}
        headers={headers}
        title={"Western"}
      />
    </>
  );
};

export default ConferenceTable;
