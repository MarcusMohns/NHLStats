import type { StandingsType } from "../Standings.tsx";
import StyledTable from "../components/StyledTable.tsx";

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
  return (
    <>
      <StyledTable standings={central} headers={headers} title={"Central"} />
      <StyledTable standings={atlantic} headers={headers} title={"Atlantic"} />
      <StyledTable
        standings={metropolitan}
        headers={headers}
        title={"Metropolitan"}
      />
      <StyledTable standings={pacific} headers={headers} title={"Pacific"} />
    </>
  );
};

export default DivisionTable;
