import { useState, useEffect } from "react";
import fetchStandings from "../../api/fetchStandings.ts";
import LeagueTable from "./tables/LeagueTable.tsx";
import ConferenceTable from "./tables/ConferenceTable.tsx";
import DivisionTable from "./tables/DivisionTable.tsx";
import WildCardTable from "./tables/WildCardTable.tsx";
import TeamStatsModal from "./components/teamStatsModal/TeamStatsModal.tsx";
import startViewTransitionWrapper from "../utility/startViewTransitionWrapper.ts";
import SelectTableButtons from "../../components/SelectTableButtons.tsx";
import ErrorWithBtn from "../../components/ErrorWithBtn.tsx";
import { spinner } from "../../components/svgs.tsx";

export type TeamType = {
  clinchIndicator?: string;
  rank: number;
  teamName: { default: string };
  teamAbbrev: { default: string };
  teamCommonName: { default: string };
  teamLogo: string;
  teamLogoDark: string;
  points: number;
  gamesPlayed: number;
  wins: number;
  losses: number;
  otLosses: number;
  goalDifferential: number;
  l10Wins: number;
  l10Losses: number;
  l10OtLosses: number;
  streakCode: string;
  streakCount: number;
  conferenceName: string;
  divisionName: string;
  wildCardSequence: number;
  winPctg: number;
};

type StandingsType = {
  [key: string]: TeamType[];
  League: TeamType[];
  Western: TeamType[];
  Eastern: TeamType[];
  Central: TeamType[];
  Atlantic: TeamType[];
  Metropolitan: TeamType[];
  Pacific: TeamType[];
};

export type ErrorType = {
  error: boolean;
  text: string;
  message: string;
  name: string;
};

const Standings = () => {
  const [standings, setStandings] = useState<StandingsType | null>(null);
  const [selectedTable, setSelectedTable] = useState<string>("League");
  const [modal, setModal] = useState<{
    open: boolean;
    team: TeamType | null;
  }>({
    open: false,
    team: null,
  });
  const [error, setError] = useState<ErrorType>({
    error: false,
    text: "",
    message: "",
    name: "",
  });

  const handleSelectedTable = (standing: string) => {
    startViewTransitionWrapper(() => setSelectedTable(standing));
  };

  const handleCloseModal = () => {
    setModal((prevModal) => ({ ...prevModal, open: false }));
  };
  const handleOpenModal = (team: TeamType) =>
    startViewTransitionWrapper(() =>
      setModal({ open: true, team: { ...team } })
    );

  const handleSetStandings = (standingsData: TeamType[]) => {
    setStandings(
      standingsData.reduce(
        // Add the teams into correct League, Conference and Division - then set to state
        (acc: StandingsType, team: TeamType) => {
          try {
            const teamLogoDark = `https://assets.nhle.com/logos/nhl/svg/${team.teamAbbrev.default}_dark.svg`;
            const teamAndDarkLogo = { ...team, teamLogoDark };
            // Dark Logo is missing from the API call for some reason, add it manually for now.
            acc.League.push({
              ...teamAndDarkLogo,
              rank: acc.League.length + 1,
            });
            acc[team.conferenceName].push({
              ...teamAndDarkLogo,
              rank: acc[team.conferenceName].length + 1,
            });
            acc[team.divisionName].push({
              ...teamAndDarkLogo,
              rank: acc[team.divisionName].length + 1,
            });
            return acc;
          } catch (e: unknown) {
            console.error(e);
            !error.error &&
              setError({
                error: true,
                text: "Something went wrong displaying standings 🙁",
                message: "Unexpected error in reduce function",
                name: "FetchAndSetStandings",
              });
            throw e;
          }
        },
        {
          League: [],
          Western: [],
          Eastern: [],
          Central: [],
          Atlantic: [],
          Metropolitan: [],
          Pacific: [],
        }
      )
    );
  };

  const fetchAndSetStandings = async () => {
    try {
      const standingsData = await fetchStandings();
      if (!standingsData) {
        throw new Error("No standings data");
      } else {
        handleSetStandings(standingsData);
        setError({ error: false, text: "", message: "", name: "" });
      }
    } catch (e) {
      !error.error &&
        setError({
          error: true,
          text: "Something went wrong setting standings 🙁",
          message: (e as Error).message,
          name: "FetchAndSetStandings",
        });
      throw e;
    }
  };

  useEffect(() => {
    fetchAndSetStandings();
  }, []);

  const headers = {
    full: [
      "Rank",
      "Team",
      "Points",
      "Games Played",
      "Wins",
      "Losses",
      "OT Losses",
      "Goal Difference",
      "Last 10",
      "Streak",
    ],
    abbreviated: [
      "R",
      "Team",
      "Pts",
      "GP",
      "W",
      "L",
      "OTL",
      "GD",
      "L10",
      "STK",
    ],
  };

  const standingsProps = {
    handleOpenModal,
    headers,
    selectedTable,
  };

  if (error.error)
    return <ErrorWithBtn action={fetchAndSetStandings} error={error} />;

  if (!standings) {
    // 'loading'
    return (
      <div className="relative w-full 2xl:w-3/5 ml-auto h-screen p-3 mt-5 bg-gray-300 dark:bg-stone-700 animate-pulse ">
        {spinner}
      </div>
    );
  }

  return (
    <section className="standings w-full 2xl:w-3/5 ml-auto relative 2xl:border border-gray-300 dark:border-stone-600 rounded p-3 mt-5">
      {modal.open && modal.team && (
        <TeamStatsModal handleCloseModal={handleCloseModal} team={modal.team} />
      )}
      <h1 className="font-bold dark:text-stone-300 my-5 py-1 px-4 text-2xl uppercase leading-tight tracking-wide">
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
        ❌ = Eliminated ✔️ = Qualifed
      </div>
    </section>
  );
};

export default Standings;
