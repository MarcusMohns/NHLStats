import ErrorWithBtn from "../../components/ErrorWithBtn";
import { spinner } from "../../../svgs";
import { GameWeekType } from "./types";
import GameList from "./components/GameList";

type ScheduleProps = {
  schedule: GameWeekType[] | null | Error;
  handleFetchSchedule: () => Promise<void>;
};
const Schedule = ({ schedule, handleFetchSchedule }: ScheduleProps) => {
  const locale = navigator.language || "sv-SE";

  if (schedule instanceof Error)
    // error
    return (
      <ErrorWithBtn action={() => handleFetchSchedule()} error={schedule} />
    );

  if (!schedule) {
    // Loading
    return (
      <div className="relative flex items-center justify-center content-center h-300 sm:p-5 bg-stone-100 dark:bg-stone-800 animate-pulse">
        {spinner}
      </div>
    );
  }

  return (
    <section className="schedule rounded h-max sm:p-5">
      <h2 className="font-bold dark:text-stone-300 my-5 py-1 mx-2 text-xl uppercase leading-tight tracking-wide select-none border-b border-gray-300 dark:border-stone-700">
        Schedule
      </h2>
      <GameList schedule={schedule} locale={locale} />
    </section>
  );
};

export default Schedule;
