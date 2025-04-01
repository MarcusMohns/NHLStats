import fetchPlayerLeaders from "../../api/fetchPlayerLeaders";
import { useState, useEffect } from "react";
import { ErrorType } from "../standings/Standings";
import Alert from "../../components/Alert";

type PlayerType = {
  firstName: { default: string };
  headshot: string;
  id: number;
  lastName: { default: string };
  position: string;
  sweaterNumber: number;
  teamAbbrev: string;
  teamLogo: string;
  teamName: { default: string };
  value: number;
};

type GoalieType = {
  id: number;
  firstName: { default: string };
  lastName: { default: string };
  sweaterNumber: number;
  headshot: string;
  teamAbbrev: string;
  teamName: { default: string };
  teamLogo: string;
  position: string;
  value: number;
};

type LeaderBoardType = {
  topGoalScorers: PlayerType[];
  topAssists: PlayerType[];
  topPoints: PlayerType[];
  topGoalsAgainstAverage: GoalieType[];
  topSavePctg: GoalieType[];
  topShutouts: GoalieType[];
  loaded: boolean;
};

const Leaderboard = () => {
  const [leaderboards, setLeaderboards] = useState<LeaderBoardType>({
    topGoalScorers: [],
    topAssists: [],
    topPoints: [],
    topGoalsAgainstAverage: [],
    topSavePctg: [],
    topShutouts: [],
    loaded: false,
  });

  const [error, setError] = useState({
    error: false,
    text: "",
    message: "",
    name: "",
  });

  const fetchAndSetLeaders = async () => {
    try {
      const topGoalScorers = await fetchPlayerLeaders("goals", "skater");
      const topAssists = await fetchPlayerLeaders("assists", "skater");
      const topPoints = await fetchPlayerLeaders("points", "skater");
      const topGoalsAgainstAverage = await fetchPlayerLeaders(
        "goalsAgainstAverage",
        "goalie"
      );
      const topSavePctg = await fetchPlayerLeaders("savePctg", "goalie");
      const topShutouts = await fetchPlayerLeaders("shutouts", "goalie");

      if (
        !topGoalScorers ||
        !topAssists ||
        !topPoints ||
        !topSavePctg ||
        !topShutouts ||
        !topGoalsAgainstAverage
      ) {
        throw Error("Error getting leaders");
      }

      setLeaderboards({
        topGoalScorers: topGoalScorers,
        topAssists: topAssists,
        topPoints: topPoints,
        topGoalsAgainstAverage: topGoalsAgainstAverage,
        topSavePctg: topSavePctg,
        topShutouts: topShutouts,
        loaded: true,
      });
    } catch (e: unknown) {
      !error.error &&
        setError({
          error: true,
          text: "Something went wrong 🙁",
          message: (e as Error).message,
          name: "fetchAndSetLeaders",
        });
    }
  };

  useEffect(() => {
    fetchAndSetLeaders();
  }, []);

  return (
    <section className="leaderboard w-full">
      {!error.error ? (
        leaderboards.loaded ? (
          <div>
            {leaderboards.topGoalScorers.map((player) => (
              <div>
                <div>
                  <img src={player.teamLogo} className="w-12 h-12" /> - #
                  {player.sweaterNumber}({player.position})
                  <img
                    src={player.headshot}
                    alt={`${player.firstName.default} ${player.lastName.default}`}
                    className="w-12 h-12"
                  />
                </div>
                <div>
                  {player.firstName.default} {player.lastName.default} -{" "}
                  {player.value}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>Loading</div>
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
            onClick={fetchAndSetLeaders}
            className="border font-bold m-2 border-red-700 p-1 px-2 rounded hover:bg-red-500 hover:text-white cursor-pointer "
          >
            Retry
          </button>
        </Alert>
      )}
    </section>
  );
};

export default Leaderboard;
