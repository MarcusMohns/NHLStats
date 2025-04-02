import { PlayerType } from "../Leaderboard";
import PlayerCard from "../components/PlayerCard";

const AssistLeaders = ({ leaderboard }: { leaderboard: PlayerType[] }) => {
  return (
    <div>
      {leaderboard.map((player) => (
        <PlayerCard player={player} />
      ))}
    </div>
  );
};

export default AssistLeaders;
