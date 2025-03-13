import Standings from "./sections/Standings/Standings.tsx";
import Leaderboard from "./sections/Leaderboard.tsx";
import UpcomingMatches from "./sections/UpcomingMatches.tsx";

const MainContent = () => {
  return (
    <main className="flex flex-col justify-center md:flex-row w-full md:w-3/4 gap-4 mt-20">
      <Leaderboard />
      <Standings />
      <UpcomingMatches />
    </main>
  );
};

export default MainContent;
