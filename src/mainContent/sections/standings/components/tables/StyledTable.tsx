import { useRef, useState } from "react";
import { TeamType } from "../../store.tsx";
import TeamStatsModal from "../teamStatsModal/TeamStatsModal.tsx";
import startViewTransitionWrapper from "../../../../../utility/startViewTransitionWrapper.ts";
import TableRow from "./TableRow.tsx";
import TableHeader from "./TableHeader.tsx";

type StyledTableProps = {
  standings: TeamType[];
  handleSort: (
    oldStandings: TeamType[],
    sortBy: string,
    argument: string
  ) => void;
  headers: { full: string[]; abbreviated: string[] };
  tableName: string;
  selectedTable: string;
};
const StyledTable = ({
  standings,
  headers,
  tableName,
  handleSort,
  selectedTable,
}: StyledTableProps) => {
  const tooltipRefs = useRef<Array<HTMLDialogElement>>([]);
  const toggleTooltip = (argument: string, idx: number) => {
    if (tooltipRefs.current[idx] !== null) {
      argument === "show"
        ? tooltipRefs.current[idx].show()
        : tooltipRefs.current[idx].close();
    }
  };

  const [modal, setModal] = useState<{
    open: boolean;
    team: TeamType | null;
  }>({
    open: false,
    team: null,
  });

  const handleCloseModal = () => {
    startViewTransitionWrapper(() =>
      setModal((prevModal) => ({ ...prevModal, open: false }))
    );
  };
  const handleOpenModal = (team: TeamType) =>
    startViewTransitionWrapper(() =>
      setModal({ open: true, team: { ...team } })
    );

  return (
    <>
      {modal.open && modal.team && (
        <TeamStatsModal handleCloseModal={handleCloseModal} team={modal.team} />
      )}

      <h2 className="font-bold dark:text-stone-300 my-5 pt-3 px-1 text-xl uppercase leading-tight tracking-wide select-none dark:border-stone-700">
        {tableName}
      </h2>
      <table
        className="dark:bg-stone-900 shadow-lg w-full text-sm text-left rtl:text-right"
        cellSpacing="5"
      >
        <thead className="bg-gray-300 dark:bg-stone-800">
          <tr>
            {headers.full.map((header, idx) => (
              <TableHeader
                key={header}
                header={header}
                idx={idx}
                standings={standings}
                headers={headers}
                tableName={tableName}
                handleSort={handleSort}
                toggleTooltip={toggleTooltip}
                tooltipRefs={tooltipRefs}
              />
            ))}
          </tr>
        </thead>
        <tbody className="font-medium">
          {standings.map((team, idx) => (
            <TableRow
              key={team.teamAbbrev.default}
              team={team}
              selectedTable={selectedTable}
              handleOpenModal={handleOpenModal}
              tableName={tableName}
              idx={idx}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default StyledTable;
