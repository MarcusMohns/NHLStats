import { PlayerType } from "../Leaderboard";
import PlayerCard from "../components/PlayerCard";

const ShutoutLeaders = ({ leaderboard }: { leaderboard: PlayerType[] }) => (
  <div>
    {leaderboard.map((player) => (
      <PlayerCard player={player} key={player.id} />
    ))}
  </div>
);

export default ShutoutLeaders;
