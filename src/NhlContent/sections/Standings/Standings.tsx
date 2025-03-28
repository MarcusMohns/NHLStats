import { useState, useEffect, useMemo } from "react";
import fetchStandings from "../../api/fetchStandings.ts";
import LeagueTable from "./tables/LeagueTable.tsx";
import ConferenceTable from "./tables/ConferenceTable.tsx";
import DivisionTable from "./tables/DivisionTable.tsx";
import WildCardTable from "./tables/WildCardTable.tsx";
import Alert from "../../components/Alert.tsx";
import TeamStatsModal from "./components/TeamStatsModal.tsx";
import { flushSync } from "react-dom";
import startViewTransitionWrapper from "../utility/startViewTransitionWrapper.ts";
import SelectTableButtons from "./components/SelectTableButtons.tsx";

export type TeamType = {
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
  League: TeamType[];
  Western: TeamType[];
  Eastern: TeamType[];
  Central: TeamType[];
  Atlantic: TeamType[];
  Metropolitan: TeamType[];
  Pacific: TeamType[];
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
  const [error, setError] = useState<{
    error: boolean;
    text: string;
    message: string;
    name: string;
  }>({ error: false, text: "", message: "", name: "" });

  const handleSetSelectedStandings = (standing: string) => {
    startViewTransitionWrapper(() => setSelectedStandings(standing));
  };

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

  useEffect(() => {
    // On first render fetch the standings data and sort the teams into League, Conference, Division - then set to state
    const fetchStandingsData = async () => {
      const standingsData = await fetchStandings(setError);
      setStandings(
        () =>
          standingsData &&
          standingsData.reduce(
            (acc: Record<string, TeamType[]>, team: TeamType) => {
              const teamLogoDark = `https://assets.nhle.com/logos/nhl/svg/${team.teamAbbrev.default}_dark.svg`;
              // Dark Logo is missing from the API call for some reason, add it manually for now.
              acc.League.push({
                ...team,
                rank: acc.League.length + 1,
                teamLogoDark,
              });
              acc[team.conferenceName].push({
                ...team,
                rank: acc[team.conferenceName].length + 1,
                teamLogoDark,
              });
              acc[team.divisionName].push({
                ...team,
                rank: acc[team.divisionName].length + 1,
                teamLogoDark,
              });
              return acc;
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
    fetchStandingsData();
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
          </div>
        ) : (
          <div> Loading</div>
        )
      ) : (
        <Alert
          message={error.message}
          text={error.text}
          name={error.name}
          messageHeader={"Error"}
          bgColor="bg-red-100"
          borderColor="border-red-500"
          textColor="text-red-700"
        />
      )}
    </section>
  );
};

export default Standings;
