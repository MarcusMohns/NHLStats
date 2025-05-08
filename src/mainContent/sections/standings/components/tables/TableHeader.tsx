import React from "react";
import { TeamType } from "../../types";

type TableHeaderProps = {
  header: string;
  idx: number;
  standings: TeamType[];
  headers: {
    full: string[];
    abbreviated: string[];
  };
  tableName: string;
  handleSort: (
    standings: TeamType[],
    header: string,
    tableName: string
  ) => void;
  toggleTooltip: (argument: string, idx: number) => void;
  tooltipRefs: React.RefObject<HTMLDialogElement[]> | null;
};

const TableHeader = ({
  header,
  handleSort,
  idx,
  standings,
  headers,
  tableName,
  toggleTooltip,
  tooltipRefs,
}: TableHeaderProps) => {
  // Hide headers for Last 10 and Streak on smaller screens
  const HIDDEN_HEADERS = ["Last 10", "Streak"];
  return (
    <th
      className={`text-gray-500 dark:text-stone-300 text-center p-2 relative select-none ${
        HIDDEN_HEADERS.includes(header) ? "hidden md:table-cell" : ""
      }`}
    >
      <button
        className="cursor-pointer"
        onClick={() => handleSort(standings, header, tableName)}
        onMouseOver={() => toggleTooltip("show", idx)}
        onMouseOut={() => toggleTooltip("close", idx)}
        aria-label={`Sort by ${header}`}
      >
        {/* Show full sized header on larger screens, abbreviated on smaller */}
        <p className="hidden 2xl:block">{header}</p>
        <p className="sm:block 2xl:hidden">{headers.abbreviated[idx]}</p>
      </button>
      <dialog
        ref={(el) => {
          if (el && tooltipRefs) {
            tooltipRefs.current[idx] = el;
          }
        }}
        className="2xl:hidden bg-gray-802000 border border-stone-200 rounded-sm p-2 text-black m-auto"
      >
        <p>{header}</p>
      </dialog>
    </th>
  );
};

export default TableHeader;
