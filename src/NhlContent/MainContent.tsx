import Standings from "./sections/standings/Standings.tsx";
import Leaderboard from "./sections/Leaderboard.tsx";
import UpcomingMatches from "./sections/UpcomingMatches.tsx";

const MainContent = () => {
  return (
    <main className="flex flex-col justify-center align-center lg:flex-row w-full">
      <Leaderboard />
      <Standings />
      <UpcomingMatches />
    </main>
  );
};

export default MainContent;
