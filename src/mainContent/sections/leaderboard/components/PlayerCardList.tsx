import { PlayerType, GoalieType } from "../store";
import PlayerCard from "./PlayerCard";

const PlayerCardList = ({
  leaderboard,
}: {
  leaderboard: PlayerType[] | GoalieType[];
}) => (
  <div>
    {leaderboard.map((player) => (
      <PlayerCard player={player} key={player.id} />
    ))}
  </div>
);

export default PlayerCardList;
