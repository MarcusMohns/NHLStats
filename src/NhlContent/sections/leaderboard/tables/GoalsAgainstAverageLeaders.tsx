import { GoalieType } from "../Leaderboard";
import PlayerCard from "../components/PlayerCard";

const GoalsAgainstAverageLeaders = ({
  leaderboard,
}: {
  leaderboard: GoalieType[];
}) => (
  <div>
    {leaderboard.map((player) => (
      <PlayerCard
        player={{ ...player, value: Number(player.value.toFixed(2)) }}
        key={player.id}
      />
    ))}
  </div>
);

export default GoalsAgainstAverageLeaders;
