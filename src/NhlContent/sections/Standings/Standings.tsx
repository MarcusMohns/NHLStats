import { useState, useEffect, useMemo } from "react";
import fetchStandings from "../../api/fetchStandings.ts";
// import initialStandingsState from "../../api/initialStandingsState.ts";
import LeagueTable from "./tables/LeagueTable.tsx";
import ConferenceTable from "./tables/ConferenceTable.tsx";
import DivisionTable from "./tables/DivisionTable.tsx";
import Alert from "../../components/Alert.tsx";

export type StandingsType = {
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
    // Sort teams under the different tables and give them a rank wheneer standings state change (when fetchStandings is called)
    () =>
      standings &&
      standings.reduce(
        (acc: Record<string, StandingsType[]>, team: StandingsType) => {
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
        sortedTeams ? (
          <div className="tables">
            {selectedTable === "League" && (
              <LeagueTable league={sortedTeams.League} headers={headers} />
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
