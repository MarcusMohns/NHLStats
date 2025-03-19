import Standings from "./sections/standings/Standings.tsx";
import Leaderboard from "./sections/Leaderboard.tsx";
import UpcomingMatches from "./sections/UpcomingMatches.tsx";
import { useState } from "react";
import Modal from "./components/Modal.tsx";

const MainContent = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleModalOpen = () => {
    setModalOpen((prevState) => !prevState);
  };

  return (
    <main className="flex flex-col justify-center md:flex-row w-full md:w-3/4 gap-4 mt-20">
      {modalOpen && <Modal handleModalOpen={handleModalOpen} />}
      <button onClick={() => setModalOpen(true)}>OPEN MODAL! :)</button>
      <Leaderboard />
      <Standings />
      <UpcomingMatches />
    </main>
  );
};

export default MainContent;
