import { PlayerType } from "../Leaderboard";
import ImageAndLoading from "../../utility/ImageAndLoading";

const PlayerCard = ({ player }: { player: PlayerType }) => {
  return (
    <div className="shadow-sm my-3 bg-white dark:bg-stone-800 rounded flex justify-center">
      <div className="flex flex-row items-center py-2 w-full">
        <p className="font-bold text-4xl p-3 w-25">{player.value}</p>
        <div className="flex flex-row items-center w-full">
          <div className="flex flex-row justify-start">
            <ImageAndLoading
              imgSrc={player.headshot}
              height="h-16"
              width="w-16"
              minHeight="min-h-16"
              minWidth="min-w-16"
            />
            <p className="flex items-center font-bold text-xl xl:text-lg mx-2">
              {player.firstName.default} {player.lastName.default}
            </p>
          </div>
          <div className="flex flex-col items-center ml-auto text-lg">
            #{player.sweaterNumber}
            <img src={player.teamLogo} className="w-16 h-16" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
