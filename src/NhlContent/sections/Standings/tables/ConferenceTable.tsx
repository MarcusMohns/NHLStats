import type { StandingsType } from "../Standings.tsx";
import StyledTable from "../components/StyledTable.tsx";

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
  return (
    <>
      <StyledTable standings={eastern} headers={headers} title={"Eastern"} />
      <StyledTable standings={western} headers={headers} title={"Western"} />
    </>
  );
};

export default ConferenceTable;
