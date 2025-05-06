import { GoalieType } from "../../../types";
import { puck } from "../../../../../../svgs";
import ImageAndLoading from "../../../../../../utility/ImageAndLoading";
import LinkOut from "../../../../../components/LinkOut";

const GoalieCard = ({ player }: { player: GoalieType }) => {
  return (
    <div className="flex flex-row shadow-sm bg-white dark:bg-stone-800 rounded mt-2">
      <ImageAndLoading imgSrc={player.headshot} />
      <div className="flex w-full flex-col items-center justify-center">
        <div className="flex w-full text-md uppercase font-bold mb-2">
          <p className="ml-auto pl-6">
            {player.firstName.default} {player.lastName.default}
          </p>

          <LinkOut
            linkOutStyles="ml-auto w-6"
            hrefString={` https://www.nhl.com/player/${player.playerId}`}
          />
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
