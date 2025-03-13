import type { StandingsType } from "../Standings.tsx";

type WildCardTableProps = {
  standings: StandingsType[];
  headers: string[];
};

const WildCardTable = ({ standings, headers }: WildCardTableProps) => {
  return <div>WildCardTable</div>;
};

export default WildCardTable;
