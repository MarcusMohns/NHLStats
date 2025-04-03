import { PlayerType } from "../Leaderboard";
import PlayerCard from "../components/PlayerCard";

const SavePctgLeaders = ({ leaderboard }: { leaderboard: PlayerType[] }) => (
  <div>
    {leaderboard.map((player) => (
      <PlayerCard
        player={{ ...player, value: Number(player.value.toFixed(2)) }}
        key={player.id}
      />
    ))}
  </div>
);

export default SavePctgLeaders;
