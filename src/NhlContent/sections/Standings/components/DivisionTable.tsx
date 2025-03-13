import type { StandingsType } from "../Standings.tsx";

type DivisionTableProps = {
  standings: StandingsType[];
  headers: string[];
};

const DivisionTable = ({ standings, headers }: DivisionTableProps) => {
  return <div>DivisionTable</div>;
};

export default DivisionTable;
