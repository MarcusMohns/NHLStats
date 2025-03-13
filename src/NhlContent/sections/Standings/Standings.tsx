import { useState, useEffect, useMemo } from "react";
// import fetchStandings from "../../api/fetchStandings.ts";
import initialStandingsState from "../../api/initialStandingsState.ts";
import LeagueTable from "./components/LeagueTable.tsx";
import ConferenceTable from "./components/ConferenceTable.tsx";
import WildCardTable from "./components/WildCardTable.tsx";
import DivisionTable from "./components/DivisionTable.tsx";

export type StandingsType = {
  teamName: { default: string };
  teamAbbrev: { default: string };
  teamLogo: string;
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
};

const Standings = () => {
  const [standings, setStandings] = useState<StandingsType[]>(
    initialStandingsState
  );
  // const [error, setError] = useState<boolean>(false);

  const headers = useMemo(
    () => [
      "Team",
      "Points",
      "Games Played",
      "Wins",
      "Losses",
      "OT Losses",
      "Diff",
      "L10",
      "Streak",
    ],
    []
  );

  // Memo these.
  // const sortedByDivision = () => console.log("relax.");
  // const sortedByConference = () => console.log("relax.");
  // const sortedByWildCard = () => console.log("relax.");

  return (
    <section className="w-5/8">
      <LeagueTable standings={standings} headers={headers} />
      {/* <ConferenceTable standings={sortedByConference} headers={headers} />
      <WildCardTable standings={sortedByWildCard} headers={headers} />
      <DivisionTable standings={sortedByDivision} headers={headers} /> */}
    </section>
  );

  {
    /* // useEffect(() => {
  //   fetchStandings(setStandings, setError);
  // }, []); */
  }
};

export default Standings;
