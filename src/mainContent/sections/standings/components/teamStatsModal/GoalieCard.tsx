import { GoalieType } from "./TeamStatsModal";
import { puck, linkOutIcon } from "../../../../../svgs";
import ImageAndLoading from "../../../../../utility/ImageAndLoading";

const GoalieCard = ({ player }: { player: GoalieType }) => {
  return (
    <div className="flex flex-row shadow-sm bg-white dark:bg-stone-800 rounded p-2 mt-2 w-full w-24 h-24">
      <ImageAndLoading
        imgSrc={player.headshot}
        height="h-20"
        width="w-20"
        minHeight="min-h-20"
        minWidth="min-w-20"
      />

      <div className="flex w-full flex-col items-center justify-center">
        <div className="flex w-full text-md uppercase font-bold mb-2">
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
            {puck}S: {player.savePercentage.toFixed(2)}%
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
