import { PlayerType } from "../Leaderboard";
import PlayerCard from "../components/PlayerCard";

const PointLeaders = ({ leaderboard }: { leaderboard: PlayerType[] }) => (
  <div>
    {leaderboard.map((player) => (
      <PlayerCard player={player} />
    ))}
  </div>
);

export default PointLeaders;
