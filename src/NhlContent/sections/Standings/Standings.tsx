import { useState, useEffect, useMemo } from "react";
import fetchStandings from "../../api/fetchStandings.ts";
// import initialStandingsState from "../../api/initialStandingsState.ts";
import LeagueTable from "./tables/LeagueTable.tsx";
import ConferenceTable from "./tables/ConferenceTable.tsx";
import DivisionTable from "./tables/DivisionTable.tsx";
import Alert from "../../components/Alert.tsx";

export type TeamType = {
  rank: number;
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
  conferenceName: string;
  divisionName: string;
  wildCardSequence: number;
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
  const [selectedTable, setSelectedTable] = useState<string>("League");
  const [error, setError] = useState<{
    error: boolean;
    text: string;
    message: string;
    name: string;
  }>({ error: false, text: "", message: "", name: "" });

  const headers = [
    "Rank",
    "Team",
    "Points",
    "Games Played",
    "Wins",
    "Losses",
    "OT Losses",
    "Diff",
    "L10",
    "Streak",
  ];

  const buttons = ["League", "Division", "Conference"];

  // const top3Central = sortedTeams && sortedTeams.Central.slice(3);
  // const top3Atlantic = sortedTeams && sortedTeams.Atlantic.slice(3);
  // const top3Metropolitan = sortedTeams && sortedTeams.Metropolitan.slice(3);
  // const top3Pacific = sortedTeams && sortedTeams.Pacific.slice(3);
  // const notTop3Western =
  //   sortedTeams && sortedTeams.Western.slice(3, sortedTeams.Western.length);
  // const notTop3Eastern =
  //   sortedTeams && sortedTeams.Western.slice(3, sortedTeams.Eastern.length);

  useEffect(() => {
    const fetchStandingsData = async () => {
      const standingsData = await fetchStandings(setError);
      setStandings(
        () =>
          standingsData &&
          standingsData.reduce(
            (acc: Record<string, TeamType[]>, team: TeamType) => {
              acc.League.push({
                ...team,
                rank: acc.League.length + 1,
              });
              acc[team.conferenceName].push({
                ...team,
                rank: acc[team.conferenceName].length + 1,
              });
              acc[team.divisionName].push({
                ...team,
                rank: acc[team.divisionName].length + 1,
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

  return (
    <section className="">
      <div className="buttons">
        {buttons.map((button) => (
          <button
            key={button}
            onClick={() => setSelectedTable(button)}
            className={
              button === selectedTable
                ? "bg-blue-500 text-white font-semibold py-2 px-4 m-1 border border-blue-500 hover:border-transparent rounded"
                : "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 m-1 border border-blue-500 hover:border-transparent rounded"
            }
          >
            {button}
          </button>
        ))}
      </div>
      {!error.error ? (
        standings ? (
          <div className="tables">
            {selectedTable === "League" && (
              <LeagueTable league={standings.League} headers={headers} />
            )}
            {selectedTable === "Conference" && (
              <ConferenceTable
                eastern={standings.Eastern}
                western={standings.Western}
                headers={headers}
              />
            )}

            {selectedTable === "Division" && (
              <DivisionTable
                central={standings.Central}
                atlantic={standings.Atlantic}
                metropolitan={standings.Metropolitan}
                pacific={standings.Pacific}
                headers={headers}
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
          color={"red"}
        />
      )}
    </section>
  );
};

export default Standings;
