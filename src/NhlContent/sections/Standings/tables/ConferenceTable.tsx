import type { StandingsType } from "../Standings.tsx";
import StyledTable from "../components/StyledTable.tsx";
import { useState, useCallback } from "react";

type ConferenceTableProps = {
  eastern: StandingsType[];
  western: StandingsType[];
  headers: string[];
};
type ConferenceStateType = {
  standings: StandingsType[];
  sortedBy: String;
};

const ConferenceTable = ({
  eastern,
  western,
  headers,
}: ConferenceTableProps) => {
  const [easternState, setEasternState] = useState<ConferenceStateType>({
    standings: eastern,
    sortedBy: "Points",
  });
  const [westernState, setWesternState] = useState<ConferenceStateType>({
    standings: western,
    sortedBy: "Points",
  });

  const reverseStandings = useCallback((state: ConferenceStateType) => {
    return {
      standings: state.standings.toReversed(),
      sortedBy: state.sortedBy,
    };
  }, []);

  const handleEasternSort = useCallback(
    (newState: StandingsType[], sortBy: string) => {
      console.log("wait a minute");
      setEasternState((prevState) =>
        prevState.sortedBy === sortBy
          ? reverseStandings(prevState)
          : { standings: newState, sortedBy: sortBy }
      );
    },
    [setEasternState, reverseStandings]
  );

  const handleWesternSort = useCallback(
    (newState: StandingsType[], sortBy: string) => {
      setWesternState((prevState) =>
        prevState.sortedBy === sortBy
          ? reverseStandings(prevState)
          : { standings: newState, sortedBy: sortBy }
      );
    },
    [setWesternState, reverseStandings]
  );

  return (
    <>
      <StyledTable
        standings={easternState.standings}
        handleSort={handleEasternSort}
        headers={headers}
        tableName={"Eastern"}
      />
      <StyledTable
        standings={westernState.standings}
        handleSort={handleWesternSort}
        headers={headers}
        tableName={"Western"}
      />
    </>
  );
};

export default ConferenceTable;
