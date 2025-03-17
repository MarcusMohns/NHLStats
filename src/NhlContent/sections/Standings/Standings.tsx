import { useState, useEffect, useMemo } from "react";
import fetchStandings from "../../api/fetchStandings.ts";
// import initialStandingsState from "../../api/initialStandingsState.ts";
import LeagueTable from "./tables/LeagueTable.tsx";
import ConferenceTable from "./tables/ConferenceTable.tsx";
import DivisionTable from "./tables/DivisionTable.tsx";
import Alert from "../../components/Alert.tsx";

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
  conferenceName: string;
  divisionName: string;
};

const Standings = () => {
  const [standings, setStandings] = useState<StandingsType[] | null>(
    null
    // this will be null until the api call is made
  );
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

  const sortedTeams = useMemo(
    // Sort teams under into Western Eastern etc when standings state changes (when fetchStandings is called)
    () =>
      standings &&
      standings.reduce(
        (acc: Record<string, StandingsType[]>, team: StandingsType) => {
          acc[team.conferenceName].push(team);
          acc[team.divisionName].push(team);
          return acc;
        },
        {
          Western: [],
          Eastern: [],
          Central: [],
          Atlantic: [],
          Metropolitan: [],
          Pacific: [],
        }
      ),
    [standings]
  );

  useEffect(() => {
    // Fetch our data and set it to our standings state on first render
    fetchStandings(setStandings, setError);
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
        sortedTeams && standings ? (
          <div className="tables">
            {selectedTable === "League" && (
              <LeagueTable standings={standings} headers={headers} />
            )}
            {selectedTable === "Conference" && (
              <ConferenceTable
                eastern={sortedTeams.Eastern}
                western={sortedTeams.Western}
                headers={headers}
              />
            )}

            {selectedTable === "Division" && (
              <DivisionTable
                central={sortedTeams.Central}
                atlantic={sortedTeams.Atlantic}
                metropolitan={sortedTeams.Metropolitan}
                pacific={sortedTeams.Pacific}
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
