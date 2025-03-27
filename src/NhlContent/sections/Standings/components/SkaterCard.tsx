import { SkaterType } from "./TeamStatsModal";
import { linkOutIcon } from "../../../components/svgs";

const SkaterCard = ({ player }: { player: SkaterType }) => {
  return (
    <div className="flex flex-row shadow-sm bg-slate-100 p-2 mt-2 w-full w-24 h-24">
      <img
        className="min-w-20 min-h-20 rounded-full bg-gray-300 shadow-md"
        src={player.headshot}
      />
      <div className="flex w-full flex-col items-center justify-center">
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
          <div className="text-start sm:mx-3">🎯Points: {player.points} </div>
          <div className="text-start sm:mx-3">🥅Goals: {player.goals}</div>
          <div className="text-start sm:mx-3">🤝Assists: {player.assists} </div>
          <div className="text-start sm:mx-3">
            ± Plus/Minus: {player.plusMinus}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkaterCard;
