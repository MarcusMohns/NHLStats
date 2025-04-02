import { SkaterType } from "./TeamStatsModal";
import { linkOutIcon } from "../../../../components/svgs";
import ImageAndLoading from "../../../utility/ImageAndLoading";

const SkaterCard = ({ player }: { player: SkaterType }) => {
  return (
    <div className="flex flex-row shadow-sm dark:bg-stone-800 rounded p-2 mt-2 w-full w-24 h-24">
      <ImageAndLoading
        imgSrc={player.headshot}
        height="h-20"
        width="w-20"
        minHeight="min-h-20"
        minWidth="min-w-20"
      />
      <div className="flex w-full flex-col items-center justify-center">
        <div className="flex w-full text-md uppercase font-bold mb-2">
          <p className="pc-name ml-auto pl-6">
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
