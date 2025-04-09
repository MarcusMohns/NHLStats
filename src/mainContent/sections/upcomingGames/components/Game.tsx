import { GameType } from "../store";
import LiveChip from "../../../components/LiveChip";
import Matchup from "./Matchup";

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
  return (
    <div key={game.id} className="flex flex-col">
      {weekDay !== prevWeekDay.current && (
        // Since New Date recalculates time and day based on users timezone we won't be able to use the Weekday provided in API
        // check weekDay and our Ref to see if it's a new day

        <div className="flex text-lg flex-row w-full mt-4 py-2 font-bold dark:text-stone-300 uppercase leading-tight tracking-wide border-b border-gray-300 dark:border-stone-700">
          <h2 className="px-2 sm:px-0">
            {locale} {handlePrevWeekDay(weekDay)}
            {/* //   Set Ref to so we can compare it to weekDay next iteration (also returns weekDay)*/}
          </h2>
          <p className="flex text-center align-end justify-end">
            ({date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()})
          </p>
        </div>
      )}

      <div className="flex flex-row align-center justify-center shadow-sm bg-white dark:bg-stone-800 dark:shadow-stone-800 p-2 mt-1 rounded">
        {game.gameState === "LIVE" ? (
          <LiveChip gameCenterLink={game.gameCenterLink} />
        ) : (
          <p className="flex items-center bg-stone-200 text-sm font-bold px-1 dark:bg-stone-700 rounded w-min ">
            {formattedDateTime}
          </p>
        )}
        <Matchup
          homeTeamAbbrev={game.homeTeam.abbrev}
          homeTeamLogo={game.homeTeam.logo}
          homeTeamDarkLogo={game.homeTeam.darkLogo}
          awayTeamAbbrev={game.awayTeam.abbrev}
          awayTeamLogo={game.awayTeam.logo}
          awayTeamDarkLogo={game.awayTeam.darkLogo}
          gameCenterLink={game.gameCenterLink}
        />
      </div>
    </div>
  );
};

export default Game;
