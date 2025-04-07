import { PlayerType } from "../Leaderboard";
import ImageAndLoading from "../../../../utility/ImageAndLoading";
import { linkOutIcon } from "../../../../svgs";

const PlayerCard = ({ player }: { player: PlayerType }) => {
  return (
    <div className="shadow-sm my-3 bg-white dark:bg-stone-800 rounded flex justify-center">
      <div className="flex flex-row items-center py-2 w-full">
        <p className="font-bold text-4xl p-3 w-25">{player.value}</p>
        <div className="flex flex-row items-center w-full">
          <div className="flex flex-row justify-start items-center">
            <ImageAndLoading
              imgSrc={player.headshot}
              height="h-16"
              width="w-16"
              minHeight="min-h-16"
              minWidth="min-w-16"
            />

            <p className="flex items-center font-bold text-xl xl:text-lg mx-2">
              {player.firstName.default} {player.lastName.default}
              <a
                className="ml-2 w-6"
                href={` https://www.nhl.com/player/${player.id}`}
                target="_blank"
              >
                {linkOutIcon}
              </a>
            </p>
          </div>
          <div className="flex flex-col items-center ml-auto text-lg">
            #{player.sweaterNumber}
            <img src={player.teamLogo} className="w-16 h-16 dark:hidden" />
            <img
              src={
                // The 'Dark' logo used for Washington is the old logo that doesn't work better for our dark mode anyways, so use the regular one for now.
                player.teamAbbrev === "WSH"
                  ? player.teamLogo
                  : `https://assets.nhle.com/logos/nhl/svg/${player.teamAbbrev}_dark.svg`
              }
              className="w-16 h-16 hidden dark:block"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
