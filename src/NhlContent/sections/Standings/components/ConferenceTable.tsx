import type { StandingsType } from "../Standings.tsx";

type ConferenceTableProps = {
  standings: StandingsType[];
  headers: string[];
};

const DivisionTable = ({ standings, headers }: ConferenceTableProps) => {
  return <div>DivisionTable</div>;
};

export default DivisionTable;
