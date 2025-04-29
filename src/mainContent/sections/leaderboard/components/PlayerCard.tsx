import { PlayerType } from "../store";
import ImageAndLoading from "../../../../utility/ImageAndLoading";
import LinkOut from "../../../components/LinkOut";

const PlayerCard = ({ player }: { player: PlayerType }) => {
  return (
    <div className="flex flex-row items-center py-2 shadow-sm my-3 bg-white dark:bg-stone-800 rounded w-full">
      <p className="font-bold text-2xl sm:text-5xl sm:p-3 p-0 pl-3 w-30 sm:w-max md:w-50">
        {player.position === "G" && player.value.toString().length > 3
          ? // If Goalie & value is greater than 3 digits, fix decimals
            player.value.toFixed(3)
          : player.value}
      </p>
      <div className="flex flex-row items-center w-full">
        <div className="flex flex-col-reverse sm:flex-row justify-start items-center w-min sm:w-full grow">
          <p className="flex items-center font-bold justify-center text-xl xl:text-xl mx-2 text-center w-full gap-2">
            <ImageAndLoading
              imgSrc={player.headshot}
              height="h-16 md:h-20"
              width="w-16 md:h-20"
              minHeight="min-h-16 md:min-h-20"
              minWidth="min-w-16 md:min-w-20"
            />
            <p className="md:w-50">
              {player.firstName.default} {player.lastName.default}
            </p>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center text-lg mr-2">
          <div className="flex flex-row">
            <p className="bg-stone-200 dark:bg-stone-700 rounded text-base font-bold w-full h-max sm:text-2xl p-1 text-center mr-1 sm:mr-2">
              {player.position}
            </p>
            <p className="bg-stone-200 dark:bg-stone-700 rounded p-1 text-base font-bold sm:text-2xl">
              #{player.sweaterNumber}
            </p>
          </div>
          <img
            src={player.teamLogo}
            className="w-16 h-16 sm:w-22 sm:h-22 dark:hidden sm:mx-15"
          />
          <img
            src={
              // The 'Dark' logo used for Washington is the old logo that doesn't work better for our dark mode anyways, so use the regular one for now.
              player.teamAbbrev === "WSH"
                ? player.teamLogo
                : `https://assets.nhle.com/logos/nhl/svg/${player.teamAbbrev}_dark.svg`
            }
            className="w-16 h-16 sm:w-22 sm:h-22 dark:block hidden sm:mx-15"
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
