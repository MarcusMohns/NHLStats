import { useState, useEffect, useCallback } from "react";
import SelectTableButtons from "../../components/SelectTableButtons";
import startViewTransitionWrapper from "../../../utility/startViewTransitionWrapper";
import ErrorWithBtn from "../../components/ErrorWithBtn";
import { spinner } from "../../../svgs";
import PlayerCardList from "./components/PlayerCardList";
import { LeaderBoardsType, ErrorType, fetchLeaders } from "./store";

const Leaderboard = () => {
  const [leaderboards, setLeaderboards] = useState<LeaderBoardsType>({
    Points: [],
    Assists: [],
    Goals: [],
    Shutouts: [],
    "Save%": [],
    GAA: [],
  });

  const [selectedLeaderboard, setSelectedLeaderboard] =
    useState<string>("Points");

  const [error, setError] = useState({
    error: false,
    text: "",
    message: "",
    name: "",
  });

  const handleSelectedTable = useCallback((standing: string) => {
    startViewTransitionWrapper(() => setSelectedLeaderboard(standing));
  }, []);

  const handleSetLeaderboards = useCallback(
    (data: LeaderBoardsType) => setLeaderboards(data),
    []
  );
  const handleSetError = useCallback((e: ErrorType) => setError(e), []);

  useEffect(() => {
    fetchLeaders(handleSetLeaderboards, handleSetError, error);
  }, []);

  if (error.error) {
    return (
      <ErrorWithBtn
        action={() =>
          fetchLeaders(handleSetLeaderboards, handleSetError, error)
        }
        error={error}
      />
    );
  }

  if (!leaderboards.Points.length) {
    // loading
    return (
      <div className="relative w-full h-271.25 sm:w-125 shadow-md rounded sm:p-3 2xl:mb-5 bg-stone-100 dark:bg-stone-900 animate-pulse">
        {spinner}
      </div>
    );
  }
  return (
    <section className="leaderboard w-full sm:w-125 h-max shadow-md rounded sm:p-3 2xl:mb-5 bg-stone-100 dark:bg-stone-900">
      <h2 className="font-bold dark:text-stone-300 my-5 py-1 sm:px-2 text-2xl uppercase leading-tight tracking-wide select-none">
        Leaderboard
      </h2>
      <h3 className="font-bold dark:text-stone-300 uppercase leading-tight tracking-wide mt-5 select-none">
        Skaters
      </h3>
      <SelectTableButtons
        buttons={["Points", "Assists", "Goals"]}
        selectedTable={selectedLeaderboard}
        handleSelectedTable={handleSelectedTable}
      />
      <h3 className="font-bold dark:text-stone-300 uppercase leading-tight tracking-wide mt-5 select-none">
        Goalies
      </h3>
      <SelectTableButtons
        buttons={["Shutouts", "Save%", "GAA"]}
        selectedTable={selectedLeaderboard}
        handleSelectedTable={handleSelectedTable}
      />
      <h2 className="font-bold dark:text-stone-300 my-5 py-1 px-2 text-2xl uppercase leading-tight tracking-wide select-none border-b border-gray-300 dark:border-stone-700">
        {selectedLeaderboard}
      </h2>
      <PlayerCardList
        leaderboard={
          leaderboards[selectedLeaderboard as keyof LeaderBoardsType]
        }
      />
    </section>
  );
};

export default Leaderboard;
