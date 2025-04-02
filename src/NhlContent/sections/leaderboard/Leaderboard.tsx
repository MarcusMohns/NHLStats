import fetchPlayerLeaders from "../../api/fetchPlayerLeaders";
import { useState, useEffect } from "react";
import Alert from "../../components/Alert";
import SelectTableButtons from "../../components/SelectTableButtons";
import startViewTransitionWrapper from "../utility/startViewTransitionWrapper";
import PlayerCard from "./components/PlayerCard";
import AssistLeaders from "./tables/AssistLeaders";
import GoalLeaders from "./tables/GoalLeaders";
import PointLeaders from "./tables/PointLeaders";

export type PlayerType = {
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

export type GoalieType = {
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

export type LeaderBoardsType = {
  topGoalScorers: PlayerType[];
  topAssists: PlayerType[];
  topPoints: PlayerType[];
  topGoalsAgainstAverage: GoalieType[];
  topSavePctg: GoalieType[];
  topShutouts: GoalieType[];
  loaded: boolean;
};

const Leaderboard = () => {
  const [leaderboards, setLeaderboards] = useState<LeaderBoardsType>({
    topGoalScorers: [],
    topAssists: [],
    topPoints: [],
    topGoalsAgainstAverage: [],
    topSavePctg: [],
    topShutouts: [],
    loaded: false,
  });
  const [selectedLeaderboard, setSelectedLeaderboard] =
    useState<string>("Points");
  const [fetchLoading, setFetchloading] = useState(false);
  const [error, setError] = useState({
    error: false,
    text: "",
    message: "",
    name: "",
  });

  const handleSelectedTable = (standing: string) => {
    startViewTransitionWrapper(() => setSelectedLeaderboard(standing));
  };

  const fetchAndSetLeaders = async () => {
    setFetchloading(true);
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
        throw Error("No leaders data");
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
      setError({ error: false, text: "", message: "", name: "" });
    } catch (e: unknown) {
      !error.error &&
        setError({
          error: true,
          text: "Something went wrong 🙁",
          message: (e as Error).message,
          name: "fetchAndSetLeaders",
        });
    }
    setFetchloading(false);
  };

  useEffect(() => {
    fetchAndSetLeaders();
  }, []);

  const buttons = ["Points", "Assists", "Goals"];

  return (
    <section className="leaderboard w-full 2xl:w-1/5 2xl:mx-10 xl:w-2/5">
      {!error.error ? (
        leaderboards.loaded ? (
          <>
            <SelectTableButtons
              buttons={buttons}
              selectedTable={selectedLeaderboard}
              handleSelectedTable={handleSelectedTable}
            />
            {selectedLeaderboard === "Points" && (
              <PointLeaders leaderboard={leaderboards.topPoints} />
            )}
            {selectedLeaderboard === "Assists" && (
              <AssistLeaders leaderboard={leaderboards.topAssists} />
            )}
            {selectedLeaderboard === "Goals" && (
              <GoalLeaders leaderboard={leaderboards.topGoalScorers} />
            )}
          </>
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
            className={`border font-bold m-2 border-red-700 p-1 px-2 rounded hover:bg-red-500 hover:text-white cursor-pointer ${
              fetchLoading && "opacity-50 cursor-not-allowed"
            }`}
            disabled={fetchLoading}
          >
            Retry
          </button>
        </Alert>
      )}
    </section>
  );
};

export default Leaderboard;
