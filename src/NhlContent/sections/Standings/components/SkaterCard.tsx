import { SkaterType } from "./TeamStatsModal";

const SkaterCard = ({ player }: { player: SkaterType }) => {
  return (
    <div className="flex flex-row shadow-sm bg-slate-100 p-2 mt-2 w-full w-24 h-24">
      <img
        className="min-w-20 min-h-20 rounded-full bg-gray-300 shadow-md"
        src={player.headshot}
      />
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center text-center w-full text-md text-gray-900 uppercase font-bold mb-2">
          {player.firstName.default} {player.lastName.default}{" "}
        </div>
        <div className="flex ml-12 flex-row flex-wrap font-medium ">
          <div className="flex mx-5">🎯Points: {player.points} </div>
          <div className="flex mx-5">🥅Goals: {player.goals}</div>
          <div className="flex mx-5">🤝Assists: {player.assists} </div>
          <div className="flex mx-5">± Plus/Minus: {player.plusMinus}</div>
        </div>
      </div>
    </div>
  );
};

export default SkaterCard;
