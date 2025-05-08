import { PlayerType } from "../types";
import ImageAndLoading from "../../../../utility/ImageAndLoading";
import LinkOut from "../../../components/LinkOut";

const PlayerCard = ({ player }: { player: PlayerType }) => {
  return (
    <div className="flex flex-row items-center justify-between py-2 shadow-sm my-3 bg-stone-100 dark:bg-stone-800 rounded w-full">
      <p className="font-bold text-3xl sm:text-5xl shrink-0 text-center ml-1">
        {player.position === "G" && player.value.toString().length > 3
          ? // If Goalie & value is greater than 3 digits, fix decimals
            player.value.toFixed(2)
          : player.value}
      </p>
      <div className="flex flex-row justify-start items-center w-full">
        <div className="flex flex-col-reverse sm:flex-row mx-auto">
          <div className="flex items-center justify-start w-full">
            <ImageAndLoading imgSrc={player.headshot} />
            <p className="flex flex-row items-center justify-start sm:justify-center text-stone-600 dark:text-stone-200 font-bold 2xl:w-50">
              {player.firstName.default} {player.lastName.default}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-around text-lg ml-auto sm:ml-0">
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
            alt={`${player.teamName} Team Logo`}
          />
          <img
            src={
              // The 'Dark' logo used for Washington is the old logo that doesn't work better for our dark mode anyways, so use the regular one for now.
              player.teamAbbrev === "WSH"
                ? player.teamLogo
                : `https://assets.nhle.com/logos/nhl/svg/${player.teamAbbrev}_dark.svg`
            }
            className="w-16 h-16 sm:w-22 sm:h-22 dark:block hidden"
            alt={`${player.teamName} Team Logo`}
          />
        </div>
        <LinkOut
          linkOutStyles="mb-auto mr-1"
          hrefString={`https://www.nhl.com/player/${player.id}`}
          aria-label={`View ${player.firstName.default}'s profile on NHL.com`}
        />
      </div>
    </div>
  );
};

export default PlayerCard;
