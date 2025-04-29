import Standings from "./sections/standings/Standings.tsx";
import Leaderboard from "./sections/leaderboard/Leaderboard.tsx";
import Schedule from "./sections/schedule/Schedule.tsx";
import SelectTabButtons from "./components/SelectTabButtons.tsx";
import startViewTransitionWrapper from "../utility/startViewTransitionWrapper.ts";
import { useEffect, useState, useCallback } from "react";

import { StandingsType } from "./sections/standings/store.tsx";
import { LeaderBoardsType } from "./sections/leaderboard/store.tsx";
import { GameWeekType } from "./sections/schedule/store.tsx";
import { fetchStandings } from "./sections/standings/store.tsx";
import { fetchLeaderboard } from "./sections/leaderboard/store.tsx";
import { fetchSchedule } from "./sections/schedule/store.tsx";

const MainContent = () => {
  const [selectedTab, setSelectedTab] = useState<string>("Standings");

  const [standings, setStandings] = useState<StandingsType | null | Error>(
    null
  );
  const [leaderboard, setLeaderboard] = useState<
    LeaderBoardsType | null | Error
  >(null);
  const [schedule, setSchedule] = useState<GameWeekType[] | null | Error>(null);

  const handleSelectedTab = (button: string) =>
    startViewTransitionWrapper(() => setSelectedTab(button));

  const handleFetchStandings = useCallback(async () => {
    const standings = await fetchStandings();
    setStandings(standings);
  }, [setStandings]);

  const handleFetchLeaderboard = useCallback(async () => {
    const leaders = await fetchLeaderboard();
    setLeaderboard(leaders);
  }, [setLeaderboard]);

  const handleFetchSchedule = useCallback(async () => {
    const schedule = await fetchSchedule();
    setSchedule(schedule);
  }, [setSchedule]);

  useEffect(() => {
    handleFetchStandings();
    handleFetchLeaderboard();
    handleFetchSchedule();
  }, [handleFetchStandings, handleFetchLeaderboard, handleFetchSchedule]);

  return (
    <main
      className={`dark:text-white flex flex-col justify-center align-center dark:bg-stone-900/99 sm:p-10
    min-h-screen w-full md:pt-15`}
    >
      <SelectTabButtons
        buttons={["Standings", "Leaderboard", "Schedule"]}
        selectedTab={selectedTab}
        handleSelectedTab={handleSelectedTab}
      />
      {selectedTab === "Standings" && (
        <Standings
          standings={standings}
          handleFetchStandings={handleFetchStandings}
        />
      )}
      {selectedTab === "Leaderboard" && (
        <Leaderboard
          leaderboard={leaderboard}
          handleFetchLeaderboard={handleFetchLeaderboard}
        />
      )}
      {selectedTab === "Schedule" && (
        <Schedule
          schedule={schedule}
          handleFetchSchedule={handleFetchSchedule}
        />
      )}
    </main>
  );
};

export default MainContent;
