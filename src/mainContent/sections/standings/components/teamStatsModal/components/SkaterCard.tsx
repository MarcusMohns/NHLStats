import { SkaterType } from "../../../types";
import ImageAndLoading from "../../../../../../utility/ImageAndLoading";
import LinkOut from "../../../../../components/LinkOut";

const SkaterCard = ({ player }: { player: SkaterType }) => {
  return (
    <div className="flex flex-row  shadow-sm bg-white dark:bg-stone-800 rounded mt-2">
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
          <div className="pc-points text-start sm:mx-3">
            🎯Points: {player.points}{" "}
          </div>
          <div className="pc-goals text-start sm:mx-3">
            🥅Goals: {player.goals}
          </div>
          <div className="pc-assists text-start sm:mx-3">
            🤝Assists: {player.assists}{" "}
          </div>
          <div className="pc-plusminus text-start sm:mx-3">
            ± Plus/Minus: {player.plusMinus}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkaterCard;
