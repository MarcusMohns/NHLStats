import { useState } from "react";
import LeagueTable from "./components/tables/LeagueTable.tsx";
import ConferenceTable from "./components/tables/ConferenceTable.tsx";
import DivisionTable from "./components/tables/DivisionTable.tsx";
import WildCardTable from "./components/tables/WildCardTable.tsx";
import startViewTransitionWrapper from "../../../utility/startViewTransitionWrapper.ts";
import SelectTableButtons from "../../components/SelectTableButtons.tsx";
import ErrorWithBtn from "../../components/ErrorWithBtn.tsx";
import { spinner } from "../../../svgs.tsx";
import { StandingsType, headers } from "./store";

type StandingsProps = {
  standings: StandingsType | Error | null;
  handleFetchStandings: () => Promise<void>;
};

const Standings = ({ standings, handleFetchStandings }: StandingsProps) => {
  const [selectedTable, setSelectedTable] = useState<string>("League");
  const handleSelectedTable = (standing: string) => {
    startViewTransitionWrapper(() => setSelectedTable(standing));
  };

  if (standings instanceof Error)
    // error
    return (
      <ErrorWithBtn action={() => handleFetchStandings()} error={standings} />
    );

  if (!standings) {
    // loading
    return (
      <div className="relative w-full sm:h-668.75 h-screen sm:p-3 2xl:mx-3 rounded animate-pulse">
        {spinner}
      </div>
    );
  }

  const standingsProps = {
    headers,
    selectedTable,
  };
  return (
    <section className="standings sm:p-3 2xl:mb-5 rounded h-max lg:w-3/4 lg:mx-auto">
      <h1 className="font-bold dark:text-stone-300 my-5 py-1 px-2 text-2xl uppercase leading-tight tracking-wide select-none border-b border-gray-300 dark:border-stone-700">
        Standings
      </h1>
      <SelectTableButtons
        buttons={["League", "Division", "Conference", "Wild Card"]}
        handleSelectedTable={handleSelectedTable}
        selectedTable={selectedTable}
      />
      {selectedTable === "League" && (
        <LeagueTable league={standings.League} {...standingsProps} />
      )}
      {selectedTable === "Conference" && (
        <ConferenceTable
          eastern={standings.Eastern}
          western={standings.Western}
          {...standingsProps}
        />
      )}

      {selectedTable === "Division" && (
        <DivisionTable
          central={standings.Central}
          atlantic={standings.Atlantic}
          metropolitan={standings.Metropolitan}
          pacific={standings.Pacific}
          {...standingsProps}
        />
      )}
      {/* rendered slightly different, needs parts of the other tables */}
      {selectedTable === "Wild Card" && (
        <WildCardTable
          central={standings.Central}
          atlantic={standings.Atlantic}
          metropolitan={standings.Metropolitan}
          pacific={standings.Pacific}
          eastern={standings.Eastern}
          western={standings.Western}
          {...standingsProps}
        />
      )}
      <div className="text-sm font-semibold uppercase p-3">
        ❌ = Eliminated ✔️ = Qualified
      </div>
    </section>
  );
};

export default Standings;
