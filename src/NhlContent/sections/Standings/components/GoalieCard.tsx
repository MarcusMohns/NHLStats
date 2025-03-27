import { GoalieType } from "./TeamStatsModal";
import { puck, linkOutIcon } from "../../../components/svgs";

const GoalieCard = ({ player }: { player: GoalieType }) => {
  return (
    <div className="flex flex-row shadow-sm bg-slate-100 p-2 mt-2 w-full w-24 h-24">
      <img
        className="max-w-20 max-h-20 rounded-full bg-gray-300 shadow-md"
        src={player.headshot}
      />
      <div className="w-full flex flex-col items-center justify-center">
        <div className="flex w-full text-md text-gray-900 uppercase font-bold mb-2">
          <p className="ml-auto pl-6">
            {player.firstName.default} {player.lastName.default}
          </p>
          <a
            className="ml-auto w-6"
            href={` https://www.nhl.com/player/${player.playerId}`}
            target="_blank"
          >
            {linkOutIcon}
          </a>
        </div>
        <div className="grid grid-flow-col grid-rows-2 gap-1 font-medium">
          <div className="flex flex-row items-center justify-start text-start sm:mx-3">
            {puck}S:{player.savePercentage.toFixed(2)}%
          </div>
          <div className="text-start sm:mx-3">
            🥅GAA: {player.goalsAgainstAverage.toFixed(2)}
          </div>
          <div className="text-start sm:mx-3">🧤Saves: {player.saves} </div>
          <div className="text-start sm:mx-3">🏒SA: {player.shotsAgainst}</div>
        </div>
      </div>
    </div>
  );
};

export default GoalieCard;
