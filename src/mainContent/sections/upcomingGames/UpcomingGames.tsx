import { useEffect, useState, useCallback } from "react";
import ErrorWithBtn from "../../components/ErrorWithBtn";
import { ErrorType } from "../standings/Standings";
import { spinner } from "../../../svgs";
import { fetchUpcomingGames } from "./store";
import { GameWeek } from "./store";

import GameList from "./components/GameList";

const UpcomingGames = () => {
  const [upcomingGames, setUpcomingGames] = useState<null | GameWeek[]>(null);
  const [error, setError] = useState<ErrorType>({
    error: false,
    text: "",
    message: "",
    name: "",
  });

  const handleSetUpcomingGames = useCallback(
    (upComingGames: GameWeek[]) => {
      setUpcomingGames(upComingGames);
    },
    [setUpcomingGames]
  );

  const handleSetError = useCallback(
    (error: ErrorType) => {
      setError(error);
    },
    [setError]
  );

  const locale = navigator.language;
  // gets the users locale to format the date correctly

  useEffect(() => {
    fetchUpcomingGames(handleSetUpcomingGames, handleSetError, error);
  }, []);

  if (error.error) {
    return (
      <ErrorWithBtn
        error={error}
        action={() =>
          fetchUpcomingGames(handleSetUpcomingGames, handleSetError, error)
        }
      />
    );
  }

  if (!upcomingGames) {
    // Loading
    return (
      <div className="relative xl:w-5/20 2xl:w-4/20 rounded p-3 h-235 bg-stone-300 dark:bg-stone-700 animate-pulse ">
        {spinner}
      </div>
    );
  }

  return (
    <section className="upcoming-games bg-stone-100 dark:bg-stone-900 xl:w-5/20 2xl:w-4/20 shadow-md rounded  sm:p-3 h-max 2xl:border border-stone-300 dark:border-stone-700">
      <h2 className="font-bold dark:text-stone-300 mt-5 py-1 px-1 text-2xl uppercase leading-tight tracking-wide">
        Upcoming Games
      </h2>
      <GameList upcomingGames={upcomingGames} locale={locale} />
    </section>
  );
};

export default UpcomingGames;
