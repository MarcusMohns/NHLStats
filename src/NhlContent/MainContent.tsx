import Standings from "./sections/standings/Standings.tsx";
import Leaderboard from "./sections/leaderboard/Leaderboard.tsx";
import Schedule from "./sections/schedule/Schedule.tsx";

const MainContent = () => {
  return (
    <main className="bg-gray-100 dark:bg-stone-900 dark:text-white flex flex-col align-center justify-center lg:flex-row w-full min-h-screen">
      <Leaderboard />
      <Standings />
      <Schedule />
    </main>
  );
};

export default MainContent;
