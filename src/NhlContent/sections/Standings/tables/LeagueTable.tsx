import type { StandingsType } from "../Standings.tsx";
import StyledTable from "../components/StyledTable.tsx";

type LeagueTableProps = {
  standings: StandingsType[];
  headers: string[];
};
const LeagueTable = ({ standings, headers }: LeagueTableProps) => {
  return (
    <StyledTable standings={standings} headers={headers} title={"League"} />
  );
};

export default LeagueTable;
