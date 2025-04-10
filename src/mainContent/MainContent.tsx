import Standings from "./sections/standings/Standings.tsx";
import Leaderboard from "./sections/leaderboard/Leaderboard.tsx";
import UpcomingGames from "./sections/upcomingGames/UpcomingGames.tsx";

const MainContent = () => {
  return (
    <main
      className={`dark:text-white flex flex-col justify-center align-center dark:bg-stone-900/99
    w-screen xl:flex-row min-h-screen overflow-x-hidden flex-wrap sm:p-2 md:pt-15`}
    >
      <UpcomingGames />
      <Standings />
      <Leaderboard />
    </main>
  );
};

export default MainContent;
