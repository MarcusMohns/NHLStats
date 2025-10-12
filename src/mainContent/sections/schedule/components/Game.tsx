import { GameType } from "../types";
import LiveChip from "../../../components/LiveChip";
import Matchup from "./Matchup";
import LinkOut from "../../../components/LinkOut";

type GameProps = {
  game: GameType;
  date: Date;
  formattedDateTime: string;
  weekDay: string;
  locale: string;
  prevWeekDay: React.RefObject<string>;
  handlePrevWeekDay: (weekDay: string) => React.ReactNode;
};
const Game = ({
  game,
  date,
  formattedDateTime,
  weekDay,
  locale,
  prevWeekDay,
  handlePrevWeekDay,
}: GameProps) => {
  const GAME_OVER = game.gameState === "OFF" || game.gameState === "FINAL";
  const GAME_LIVE = game.gameState === "LIVE" || game.gameState === "CRIT";
  return (
    <div key={game.id} className="flex flex-col sm:mx-7">
      {weekDay !== prevWeekDay.current && (
        // Since New Date recalculates time and day based on users timezone we won't be able to use the Weekday provided in API
        // check weekDay and our Ref to see if it's a new day

        <div className="flex text-lg flex-row w-full mt-4 py-2 font-bold dark:text-stone-300 uppercase leading-tight tracking-wide select-none border-b border-gray-300 dark:border-stone-700">
          <h2 className="px-2 sm:px-0">
            {locale} {handlePrevWeekDay(weekDay)}
            {/* //   Set Ref to so we can compare it to weekDay next iteration (also returns weekDay)*/}
          </h2>
          <p className="flex text-center justify-end">
            ({date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()})
          </p>
        </div>
      )}

      <div
        className={`flex flex-row align-center justify-center shadow-sm bg-stone-100 dark:bg-stone-800 dark:shadow-stone-800 mt-1 sm:p-1 p-2 rounded ${
          GAME_OVER ? "opacity-50" : ""
        }`}
      >
        {GAME_LIVE ? (
          <LiveChip gameCenterLink={game.gameCenterLink} />
        ) : GAME_OVER ? (
          <p className="flex items-center bg-stone-200 text-sm font-bold px-1 dark:bg-stone-700 rounded w-min">
            Done
          </p>
        ) : (
          <p className="flex items-center bg-stone-200 text-sm font-bold px-1 dark:bg-stone-700 rounded w-min">
            {formattedDateTime}
          </p>
        )}
        <Matchup
          homeTeamAbbrev={game.homeTeam.abbrev}
          homeTeamLogo={game.homeTeam.logo}
          homeTeamDarkLogo={game.homeTeam.darkLogo}
          homeTeamScore={game.homeTeam.score}
          awayTeamAbbrev={game.awayTeam.abbrev}
          awayTeamLogo={game.awayTeam.logo}
          awayTeamDarkLogo={game.awayTeam.darkLogo}
          awayTeamScore={game.awayTeam.score}
        />
        <LinkOut
          linkOutStyles="flex items-center h-auto mr-1"
          hrefString={`https://www.nhl.com${game.gameCenterLink}`}
          aria-label={`View game details for ${game.homeTeam.commonName} vs ${game.awayTeam.commonName}`}
        />
      </div>
    </div>
  );
};

export default Game;
