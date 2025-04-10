import { useRef } from "react";
import { weekDays } from "../store";
import { GameWeek } from "../store";
import Game from "./Game";
import { useCallback } from "react";

type GameListType = {
  upcomingGames: GameWeek[];
  locale: string;
};

const GameList = ({ upcomingGames, locale }: GameListType) => {
  // Setup ref here to keep track of the previous day in the Game component
  const prevWeekDay = useRef<string>("");
  const handlePrevWeekDay = useCallback((weekDay: string) => {
    // This is called every time the Game component decides it's a new day
    prevWeekDay.current = weekDay;
    // Set Ref to the provided weekDay
    return weekDay;
    // Return weekDay to be displayed
  }, []);

  return (
    <>
      {upcomingGames.map((gameDay) => (
        <div key={gameDay.date}>
          {gameDay.games.map((game) => {
            if (game.gameOutcome) {
              // Skip games that have already happened
              return null;
            }

            const date = new Date(game.startTimeUTC);
            // Create a new Date object from the game start time given in iso8601 (not UTC)
            // This will translate the date and time to the users timezone

            const weekDay = weekDays[date.getDay()];

            const formattedDateTime = new Intl.DateTimeFormat(
              locale || "sv-SE",
              {
                hour: "2-digit",
                minute: "2-digit",
              }
            ).format(date);

            return (
              <Game
                key={game.id}
                game={game}
                date={date}
                formattedDateTime={formattedDateTime}
                weekDay={weekDay}
                locale={locale}
                prevWeekDay={prevWeekDay}
                handlePrevWeekDay={handlePrevWeekDay}
              />
            );
          })}
        </div>
      ))}
    </>
  );
};

export default GameList;
