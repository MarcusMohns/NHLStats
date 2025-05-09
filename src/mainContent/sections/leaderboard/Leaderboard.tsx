import { useState, useCallback } from "react";
import SelectTableButtons from "../../components/SelectTableButtons";
import startViewTransitionWrapper from "../../../utility/startViewTransitionWrapper";
import ErrorWithBtn from "../../components/ErrorWithBtn";
import PlayerCardList from "./components/PlayerCardList";
import { LeaderBoardsType } from "./types";
import LeaderboardSkeleton from "./components/LeaderboardSkeleton.tsx";

type LeaderboardProps = {
  leaderboard: LeaderBoardsType | Error | null;
  handleFetchLeaderboard: () => Promise<void>;
};
const Leaderboard = ({
  leaderboard,
  handleFetchLeaderboard,
}: LeaderboardProps) => {
  const [selectedSkaterLeaders, setSelectedSkaterLeaders] =
    useState<string>("Points");
  const [selectedGoalieLeaders, setSelectedGoalieLeaders] =
    useState<string>("Save%");

  const handleSelectedSkaterLeaders = useCallback((standing: string) => {
    startViewTransitionWrapper(() => setSelectedSkaterLeaders(standing));
  }, []);

  const handleSelectedGoalieLeaders = useCallback((standing: string) => {
    startViewTransitionWrapper(() => setSelectedGoalieLeaders(standing));
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
    return <LeaderboardSkeleton />;
  }
  return (
    <section className="leaderboard h-max sm:p-5">
      <h2
        className="font-bold dark:text-stone-300 my-5 py-1 mx-2 text-xl uppercase leading-tight tracking-wide select-none 
      border-b border-gray-300 dark:border-stone-700"
        aria-label="Leaderboard Section"
      >
        Leaderboard
      </h2>
      <div className="flex flex-col xl:flex-row w-full gap-5">
        <div className="w-full">
          <h3 className="font-bold dark:text-stone-300 uppercase leading-tight tracking-wide mt-5 select-none text-2xl px-2">
            Skaters
          </h3>
          <SelectTableButtons
            buttons={["Points", "Assists", "Goals"]}
            selectedTable={selectedSkaterLeaders}
            handleSelectedTable={handleSelectedSkaterLeaders}
          />
          <h2 className="font-bold dark:text-stone-300 my-5 pt-2 px-1 text-lg uppercase leading-tight tracking-wide select-none">
            {selectedSkaterLeaders}
          </h2>
          <PlayerCardList players={leaderboard[selectedSkaterLeaders]} />
        </div>
        <div className="w-full">
          <h3 className="font-bold dark:text-stone-300 uppercase leading-tight tracking-wide mt-5 select-none text-2xl px-2">
            Goalies
          </h3>
          <SelectTableButtons
            buttons={["Save%", "Shutouts", "GAA"]}
            selectedTable={selectedGoalieLeaders}
            handleSelectedTable={handleSelectedGoalieLeaders}
          />
          <h2 className="font-bold dark:text-stone-300 my-5 pt-2 px-1 text-lg uppercase leading-tight tracking-wide select-none">
            {selectedGoalieLeaders}
          </h2>
          <PlayerCardList players={leaderboard[selectedGoalieLeaders]} />
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;
