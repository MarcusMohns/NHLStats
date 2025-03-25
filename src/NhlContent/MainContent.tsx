import Standings from "./sections/standings/Standings.tsx";
import Leaderboard from "./sections/leaderboard/Leaderboard.tsx";
import Schedule from "./sections/schedule/Schedule.tsx";

const MainContent = () => {
  return (
    <main className="bg-stone-100 flex flex-col justify-center align-center lg:flex-row w-full p-10">
      <Leaderboard />
      <Standings />
      <Schedule />
    </main>
  );
};

export default MainContent;
