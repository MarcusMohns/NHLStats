import { useState, useCallback } from "react";
import SelectTableButtons from "../../components/SelectTableButtons";
import startViewTransitionWrapper from "../../../utility/startViewTransitionWrapper";
import ErrorWithBtn from "../../components/ErrorWithBtn";
import { spinner } from "../../../svgs";
import PlayerCardList from "./components/PlayerCardList";
import { LeaderBoardsType } from "./store";

type LeaderboardProps = {
  leaderboard: LeaderBoardsType | Error | null;
  handleFetchLeaderboard: () => Promise<void>;
};
const Leaderboard = ({
  leaderboard,
  handleFetchLeaderboard,
}: LeaderboardProps) => {
  const [selectedLeaderboard, setSelectedLeaderboard] =
    useState<string>("Points");

  const handleSelectedTable = useCallback((standing: string) => {
    startViewTransitionWrapper(() => setSelectedLeaderboard(standing));
  }, []);

  if (leaderboard instanceof Error)
    // Error
    return (
      <ErrorWithBtn
        action={() => handleFetchLeaderboard()}
        error={leaderboard}
      />
    );

  if (!leaderboard) {
    // loading
    return (
      <div className="relative w-full h-271.25 shadow-md rounded sm:p-3 2xl:mb-5 bg-stone-100 dark:bg-stone-900 animate-pulse">
        {spinner}
      </div>
    );
  }
  return (
    <section className="leaderboard h-max rounded sm:p-3 2xl:mb-5 md:w-3/4 md:mx-auto">
      <h2 className="font-bold dark:text-stone-300 my-5 py-1 sm:px-2 text-2xl uppercase leading-tight tracking-wide select-none border-b border-gray-300 dark:border-stone-700">
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
      <h2 className="font-bold dark:text-stone-300 my-5 py-1 px-2 text-2xl uppercase leading-tight tracking-wide select-none">
        {selectedLeaderboard}
      </h2>
      <PlayerCardList players={leaderboard[selectedLeaderboard]} />
    </section>
  );
};

export default Leaderboard;
