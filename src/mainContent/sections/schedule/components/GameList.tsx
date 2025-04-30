import { useRef } from "react";
import { weekDays } from "../store";
import { GameWeekType } from "../types";
import Game from "./Game";
import { useCallback } from "react";

type GameListProps = {
  schedule: GameWeekType[];
  locale: string;
};

const GameList = ({ schedule, locale }: GameListProps) => {
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
    <div className="flex flex-col w-full align-center justify-center content-center">
      {schedule.map((gameDay) => (
        <div key={gameDay.date}>
          {gameDay.games.map((game) => {
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
    </div>
  );
};

export default GameList;
