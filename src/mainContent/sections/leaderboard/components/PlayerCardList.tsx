import { PlayerType, GoalieType } from "../types";
import PlayerCard from "./PlayerCard";

const PlayerCardList = ({
  players,
}: {
  players: PlayerType[] | GoalieType[];
}) => (
  <div>
    {players.map((player) => (
      <PlayerCard player={player} key={player.id} />
    ))}
  </div>
);

export default PlayerCardList;
