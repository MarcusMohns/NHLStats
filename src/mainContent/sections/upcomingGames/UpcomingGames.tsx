import ErrorWithBtn from "../../components/ErrorWithBtn";
import { spinner } from "../../../svgs";
import { GameWeekType } from "./store";
import GameList from "./components/GameList";

type UpComingGamesProps = {
  upcomingGames: GameWeekType[] | null | Error;
  handleFetchUpcomingGames: () => Promise<void>;
};
const UpcomingGames = ({
  upcomingGames,
  handleFetchUpcomingGames,
}: UpComingGamesProps) => {
  const locale = navigator.language;
  // gets the users locale to format the date correctly

  if (upcomingGames instanceof Error)
    // error
    return (
      <ErrorWithBtn
        action={() => handleFetchUpcomingGames()}
        error={upcomingGames}
      />
    );

  if (!upcomingGames) {
    // Loading
    return (
      <div className="relative bg-stone-100 dark:bg-stone-900 shadow-md rounded sm:p-3 h-235 animate-pulse">
        {spinner}
      </div>
    );
  }

  return (
    <section className="upcoming-games bg-stone-100 dark:bg-stone-900 shadow-md rounded sm:p-3 h-max">
      <h2 className="font-bold dark:text-stone-300 mt-5 my-5 py-1 px-1 text-2xl uppercase leading-tight tracking-wide select-none">
        Upcoming Games
      </h2>
      <GameList upcomingGames={upcomingGames} locale={locale} />
    </section>
  );
};

export default UpcomingGames;
