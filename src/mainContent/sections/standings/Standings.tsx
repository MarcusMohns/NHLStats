import { useState } from "react";
import LeagueTable from "./components/tables/LeagueTable.tsx";
import ConferenceTable from "./components/tables/ConferenceTable.tsx";
import DivisionTable from "./components/tables/DivisionTable.tsx";
import WildCardTable from "./components/tables/WildCardTable.tsx";
import startViewTransitionWrapper from "../../../utility/startViewTransitionWrapper.ts";
import SelectTableButtons from "../../components/SelectTableButtons.tsx";
import ErrorWithBtn from "../../components/ErrorWithBtn.tsx";
import { StandingsType } from "./types";
import { xmarkIcon, checkmarkIcon } from "../../../svgs.tsx";
import StandingsSkeleton from "./components/StandingsSkeleton.tsx";

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
    return <StandingsSkeleton />;
  }

  return (
    <section className="standings h-max sm:p-5">
      <h1 className="font-bold dark:text-stone-300 my-5 py-1 mx-2 text-xl uppercase leading-tight tracking-wide select-none border-b border-gray-300 dark:border-stone-700">
        Standings
      </h1>
      <SelectTableButtons
        buttons={["League", "Division", "Conference", "Wild Card"]}
        handleSelectedTable={handleSelectedTable}
        selectedTable={selectedTable}
      />
      {selectedTable === "League" && (
        <LeagueTable league={standings.League} selectedTable={selectedTable} />
      )}
      {selectedTable === "Conference" && (
        <ConferenceTable
          eastern={standings.Eastern}
          western={standings.Western}
          selectedTable={selectedTable}
        />
      )}

      {selectedTable === "Division" && (
        <DivisionTable
          central={standings.Central}
          atlantic={standings.Atlantic}
          metropolitan={standings.Metropolitan}
          pacific={standings.Pacific}
          selectedTable={selectedTable}
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
          selectedTable={selectedTable}
        />
      )}
      <div className="flex flex-row text-sm font-semibold uppercase p-3 gap-1">
        {xmarkIcon} = Eliminated {checkmarkIcon} = Qualified
      </div>
    </section>
  );
};

export default Standings;
