import { useState, useEffect, useMemo } from "react";
import fetchStandings from "../../api/fetchStandings.ts";
import LeagueTable from "./tables/LeagueTable.tsx";
import ConferenceTable from "./tables/ConferenceTable.tsx";
import DivisionTable from "./tables/DivisionTable.tsx";
import WildCardTable from "./tables/WildCardTable.tsx";
import Alert from "../../components/Alert.tsx";
import TeamStatsModal from "./components/teamStatsModal/TeamStatsModal.tsx";
import { flushSync } from "react-dom";
import startViewTransitionWrapper from "../utility/startViewTransitionWrapper.ts";
import SelectTableButtons from "./components/SelectTableButtons.tsx";

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
  const [selectedStandings, setSelectedStandings] = useState<string>("League");
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

  const handleSetSelectedStandings = (standing: string) => {
    startViewTransitionWrapper(() => setSelectedStandings(standing));
  };

  const handleSetError = (error: ErrorType) => setError(error);

  const handleCloseModal = () => {
    setModal((prevModal) => ({ ...prevModal, open: false }));
  };
  const handleOpenModal = (team: TeamType) => {
    document.startViewTransition
      ? document.startViewTransition(() => {
          flushSync(() => {
            setModal({ open: true, team: { ...team } });
          });
        })
      : setModal({ open: true, team: { ...team } });
  };

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

  const buttons = ["League", "Division", "Conference", "Wild Card"];

  const fetchAndSetStandings = async () => {
    try {
      const standingsData = await fetchStandings(handleSetError);
      if (!standingsData) return;
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
                handleSetError({
                  error: true,
                  text: "Something went wrong displaying standings 🙁",
                  message: "Unexpected error in reduce function",
                  name: "FetchAndSetStandings",
                });
              return acc;
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
    } catch (e: unknown) {
      !error.error &&
        handleSetError({
          error: true,
          text: "Something went wrong setting standings 🙁",
          message: (e as Error).message,
          name: "FetchAndSetStandings",
        });
    }
  };

  useEffect(() => {
    fetchAndSetStandings();
  }, []);

  const standingsProps = {
    handleOpenModal,
    headers,
    selectedStandings,
  };

  return (
    <section className="standings">
      {modal.open && modal.team && (
        <TeamStatsModal handleCloseModal={handleCloseModal} team={modal.team} />
      )}
      <SelectTableButtons
        buttons={buttons}
        handleSetSelectedStandings={handleSetSelectedStandings}
        selectedStandings={selectedStandings}
      />
      {!error.error ? (
        standings ? (
          <div className="tables">
            {selectedStandings === "League" && (
              <LeagueTable league={standings.League} {...standingsProps} />
            )}
            {selectedStandings === "Conference" && (
              <ConferenceTable
                eastern={standings.Eastern}
                western={standings.Western}
                {...standingsProps}
              />
            )}

            {selectedStandings === "Division" && (
              <DivisionTable
                central={standings.Central}
                atlantic={standings.Atlantic}
                metropolitan={standings.Metropolitan}
                pacific={standings.Pacific}
                {...standingsProps}
              />
            )}
            {/* rendered slightly different, needs parts of the other tables */}
            {selectedStandings === "Wild Card" && (
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
          </div>
        ) : (
          <div className="h-screen flex mt-15 min-w-220 w-full rounded bg-gray-300 dark:bg-stone-700 animate-pulse" />
        )
      ) : (
        <Alert
          messageHeader={`${"Error"} (${error.name})`}
          bgColor="bg-red-100"
          borderColor="border-red-500"
          textColor="text-red-700"
        >
          <p>{error.text}</p>---<p>{error.message}</p>
          <button
            onClick={fetchAndSetStandings}
            className="border font-bold m-2 border-red-700 p-1 px-2 rounded hover:bg-red-500 hover:text-white cursor-pointer "
          >
            Retry
          </button>
        </Alert>
      )}
    </section>
  );
};

export default Standings;
