import { PlayerType } from "../store";
import ImageAndLoading from "../../../../utility/ImageAndLoading";
import LinkOut from "../../../components/LinkOut";

const PlayerCard = ({ player }: { player: PlayerType }) => {
  return (
    <div className="flex flex-row items-center py-2 shadow-sm my-3 bg-white dark:bg-stone-800 rounded w-full">
      <p className="font-bold text-2xl sm:text-4xl sm:p-3 p-0 pl-3 w-30">
        {player.position === "G" && player.value.toString().length > 3
          ? player.value.toFixed(3)
          : player.value}
      </p>
      <div className="flex flex-row items-center w-full">
        <div className="flex flex-col-reverse sm:flex-row justify-start items-center w-min sm:w-full grow">
          <ImageAndLoading
            imgSrc={player.headshot}
            height="h-16"
            width="w-16"
            minHeight="min-h-16"
            minWidth="min-w-16"
          />

          <p className="flex items-center justify-between font-bold text-xl xl:text-lg mx-2 text-center w-min sm:w-max">
            {player.firstName.default} {player.lastName.default}
          </p>
        </div>

        <div className="flex flex-col items-center text-lg mr-2">
          <p className="bg-stone-200 dark:bg-stone-700 rounded p-1 text-base font-bold">
            #{player.sweaterNumber}
          </p>
          <img
            src={player.teamLogo}
            className="w-16 h-16 sm:w-22 sm:h-22 dark:hidden"
          />
          <img
            src={
              // The 'Dark' logo used for Washington is the old logo that doesn't work better for our dark mode anyways, so use the regular one for now.
              player.teamAbbrev === "WSH"
                ? player.teamLogo
                : `https://assets.nhle.com/logos/nhl/svg/${player.teamAbbrev}_dark.svg`
            }
            className="w-16 h-16 sm:w-22 sm:h-22 dark:block hidden"
          />
        </div>
        <LinkOut
          linkOutStyles="mb-auto mr-1"
          hrefString={` https://www.nhl.com/player/${player.id}`}
        />
      </div>
    </div>
  );
};

export default PlayerCard;
