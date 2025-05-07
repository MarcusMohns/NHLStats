import Standings from "./sections/standings/Standings.tsx";
import Leaderboard from "./sections/leaderboard/Leaderboard.tsx";
import Schedule from "./sections/schedule/Schedule.tsx";
import SelectTabButtons from "./components/SelectTabButtons.tsx";
import startViewTransitionWrapper from "../utility/startViewTransitionWrapper.ts";
import { useEffect, useState, useCallback } from "react";
import { StandingsType } from "./sections/standings/types.ts";
import { LeaderBoardsType } from "./sections/leaderboard/types.ts";
import { GameWeekType } from "./sections/schedule/types.ts";
import { fetchStandings } from "./sections/standings/store.tsx";
import { fetchLeaderboard } from "./sections/leaderboard/store.tsx";
import { fetchSchedule } from "./sections/schedule/store.tsx";
import { fetchPlayoffs } from "./sections/playoffs/store.tsx";
import Playoffs from "./sections/playoffs/Playoffs.tsx";
import { PlayoffsType } from "./sections/playoffs/types.ts";

const MainContent = () => {
  const [selectedTab, setSelectedTab] = useState<string>("Standings");

  const [standings, setStandings] = useState<StandingsType | null | Error>(
    null
  );
  const [leaderboard, setLeaderboard] = useState<
    LeaderBoardsType | null | Error
  >(null);
  const [schedule, setSchedule] = useState<GameWeekType[] | null | Error>(null);
  const [playoffs, setPlayoffs] = useState<PlayoffsType | null | Error>(null);

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

  const handleFetchPlayoffs = useCallback(async () => {
    const playoffs = await fetchPlayoffs();
    setPlayoffs(playoffs);
  }, [setPlayoffs]);

  useEffect(() => {
    handleFetchStandings();
    handleFetchLeaderboard();
    handleFetchSchedule();
    handleFetchPlayoffs();
  }, [
    handleFetchStandings,
    handleFetchLeaderboard,
    handleFetchSchedule,
    handleFetchPlayoffs,
  ]);

  return (
    <main
      className={`dark:text-white flex flex-col justify-start align-center xl:p-10
    min-h-screen w-full lg:w-3/4 mx-auto md:pt-15`}
    >
      <SelectTabButtons
        buttons={["Standings", "Leaderboard", "Schedule", "Playoffs"]}
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
      {selectedTab === "Playoffs" && (
        <Playoffs
          playoffs={playoffs}
          handleFetchPlayoffs={handleFetchPlayoffs}
        />
      )}
    </main>
  );
};

export default MainContent;
