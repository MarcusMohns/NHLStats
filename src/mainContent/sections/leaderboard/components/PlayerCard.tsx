import { PlayerType } from "../types";
import ImageAndLoading from "../../../../utility/ImageAndLoading";
import LinkOut from "../../../components/LinkOut";

const PlayerCard = ({ player }: { player: PlayerType }) => {
  return (
    <div className="flex flex-row items-center py-2 shadow-sm my-3 bg-stone-100 dark:bg-stone-800 rounded w-full">
      <p className="font-bold text-3xl sm:text-5xl w-15 md:w-30 shrink-0 text-center">
        {player.position === "G" && player.value.toString().length > 3
          ? // If Goalie & value is greater than 3 digits, fix decimals
            player.value.toFixed(3)
          : player.value}
      </p>
      <div className="flex flex-row w-full items-center">
        <div className="flex flex-col-reverse sm:flex-row mr-auto">
          <div className="flex items-center md:justify-center text-xl xl:text-2xl gap-3 2xl:ml-90">
            <ImageAndLoading
              imgSrc={player.headshot}
              height="h-16 md:h-20"
              width="w-16 md:w-20"
              minHeight="min-h-16 md:min-h-20"
              minWidth="min-w-16 md:min-w-20"
            />
            <p className="flex flex-row items-center gap-2 text-stone-600 dark:text-stone-200 font-bold text-center">
              {player.firstName.default} {player.lastName.default}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center text-lg justify-around xl:w-60">
          <div className="flex flex-row gap-1 md:gap-2">
            <p className="bg-stone-200 dark:bg-stone-700 rounded p-1 text-base font-bold sm:text-2xl">
              {player.position}
            </p>
            <p className="bg-stone-200 dark:bg-stone-700 rounded p-1 text-base font-bold sm:text-2xl md:w-13 text-center">
              #{player.sweaterNumber}
            </p>
          </div>
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
