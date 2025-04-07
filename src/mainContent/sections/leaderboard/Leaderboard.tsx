import fetchPlayerLeaders from "../../api/fetchPlayerLeaders";
import { useState, useEffect } from "react";
import SelectTableButtons from "../../components/SelectTableButtons";
import startViewTransitionWrapper from "../../../utility/startViewTransitionWrapper";
import AssistLeaders from "./tables/AssistLeaders";
import GoalLeaders from "./tables/GoalLeaders";
import PointLeaders from "./tables/PointLeaders";
import ShutoutLeaders from "./tables/ShutoutLeaders";
import SavePctgLeaders from "./tables/SavePctgLeaders";
import GoalsAgainstAverageLeaders from "./tables/GoalsAgainstAverageLeaders";
import ErrorWithBtn from "../../components/ErrorWithBtn";
import { spinner } from "../../../svgs";

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
        throw new Error("No leaders data");
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
  };

  useEffect(() => {
    fetchAndSetLeaders();
  }, []);

  if (error.error) {
    return <ErrorWithBtn action={fetchAndSetLeaders} error={error} />;
  }

  if (!leaderboards.loaded) {
    return (
      <div className="relative xl:w-20/20 2xl:w-5/20 rounded p-3 h-235 bg-stone-300 2xl:border border-stone-300 dark:border-stone-600 dark:bg-stone-700 animate-pulse">
        {spinner}
      </div>
    );
  }

  return (
    <section className="leaderboard xl:w-20/20 2xl:w-5/20 h-max shadow-md rounded sm:p-3 2xl:border border-stone-300 dark:border-stone-600 dark:border-stone-900 bg-stone-100 dark:bg-stone-900 ">
      <h2 className="font-bold dark:text-stone-300 my-5 py-1 sm:px-2 text-2xl uppercase leading-tight tracking-wide">
        Leaderboard
      </h2>
      <h3 className="font-bold dark:text-stone-300 uppercase leading-tight tracking-wide mt-5">
        Skaters
      </h3>
      <SelectTableButtons
        buttons={["Points", "Assists", "Goals"]}
        selectedTable={selectedLeaderboard}
        handleSelectedTable={handleSelectedTable}
      />
      <h3 className="font-bold dark:text-stone-300 uppercase leading-tight tracking-wide mt-5">
        Goalies
      </h3>
      <SelectTableButtons
        buttons={["Shutouts", "Save %", "GAA"]}
        selectedTable={selectedLeaderboard}
        handleSelectedTable={handleSelectedTable}
      />
      <h2 className="font-bold dark:text-stone-300 my-5 py-1 px-2 text-2xl uppercase leading-tight tracking-wide border-b border-gray-300 dark:border-stone-600">
        {selectedLeaderboard}
      </h2>

      {selectedLeaderboard === "Points" && (
        <PointLeaders leaderboard={leaderboards.topPoints} />
      )}
      {selectedLeaderboard === "Assists" && (
        <AssistLeaders leaderboard={leaderboards.topAssists} />
      )}
      {selectedLeaderboard === "Goals" && (
        <GoalLeaders leaderboard={leaderboards.topGoalScorers} />
      )}
      {selectedLeaderboard === "Shutouts" && (
        <ShutoutLeaders leaderboard={leaderboards.topShutouts} />
      )}
      {selectedLeaderboard === "Save %" && (
        <SavePctgLeaders leaderboard={leaderboards.topSavePctg} />
      )}
      {selectedLeaderboard === "GAA" && (
        <GoalsAgainstAverageLeaders
          leaderboard={leaderboards.topGoalsAgainstAverage}
        />
      )}
    </section>
  );
};

export default Leaderboard;
