import Standings from "./sections/standings/Standings.tsx";
import Leaderboard from "./sections/leaderboard/Leaderboard.tsx";
import UpcomingGames from "./sections/upcomingGames/UpcomingGames.tsx";
import SelectTabButtons from "./components/SelectTabButtons.tsx";
import startViewTransitionWrapper from "../utility/startViewTransitionWrapper.ts";
import { useEffect, useState, useCallback } from "react";

import { StandingsType } from "./sections/standings/store.tsx";
import { LeaderBoardsType } from "./sections/leaderboard/store.tsx";
import { GameWeekType } from "./sections/upcomingGames/store.tsx";
import { fetchStandings } from "./sections/standings/store.tsx";
import { fetchLeaderboard } from "./sections/leaderboard/store.tsx";
import { fetchUpcomingGames } from "./sections/upcomingGames/store.tsx";

const MainContent = () => {
  const [selectedTab, setSelectedTab] = useState<string>("Standings");

  const [standings, setStandings] = useState<StandingsType | null | Error>(
    null
  );
  const [leaderboard, setLeaderboard] = useState<
    LeaderBoardsType | null | Error
  >(null);
  const [upcomingGames, setUpcomingGames] = useState<
    GameWeekType[] | null | Error
  >(null);

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

  const handleFetchUpcomingGames = useCallback(async () => {
    const upcomingGames = await fetchUpcomingGames();
    setUpcomingGames(upcomingGames);
  }, [setUpcomingGames]);

  useEffect(() => {
    handleFetchStandings();
    handleFetchLeaderboard();
    handleFetchUpcomingGames();
  }, [handleFetchStandings, handleFetchLeaderboard, handleFetchUpcomingGames]);

  return (
    <main
      className={`dark:text-white flex flex-col justify-center align-center dark:bg-stone-900/99
    w-full min-h-screen overflow-x-hidden sm:p-3 md:pt-15`}
      style={{
        // bg pattern from tailwind https://heropatterns.com/
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 16c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zm33.414-6l5.95-5.95L45.95.636 40 6.586 34.05.636 32.636 2.05 38.586 8l-5.95 5.95 1.414 1.414L40 9.414l5.95 5.95 1.414-1.414L41.414 8zM40 48c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zM9.414 40l5.95-5.95-1.414-1.414L8 38.586l-5.95-5.95L.636 34.05 6.586 40l-5.95 5.95 1.414 1.414L8 41.414l5.95 5.95 1.414-1.414L9.414 40z' fill='%239C92AC' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        backgroundPosition: "center",
      }}
    >
      <SelectTabButtons
        buttons={["Standings", "Leaderboard", "Upcoming Games"]}
        selectedTable={selectedTab}
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
      {selectedTab === "Upcoming Games" && (
        <UpcomingGames
          upcomingGames={upcomingGames}
          handleFetchUpcomingGames={handleFetchUpcomingGames}
        />
      )}
    </main>
  );
};

export default MainContent;
