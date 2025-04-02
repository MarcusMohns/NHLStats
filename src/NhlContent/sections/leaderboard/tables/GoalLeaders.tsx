import { PlayerType } from "../Leaderboard";
import PlayerCard from "../components/PlayerCard";

const GoalLeaders = ({ leaderboard }: { leaderboard: PlayerType[] }) => (
  <div>
    {leaderboard.map((player) => (
      <PlayerCard player={player} />
    ))}
  </div>
);

export default GoalLeaders;
