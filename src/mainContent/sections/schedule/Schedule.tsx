import ErrorWithBtn from "../../components/ErrorWithBtn";
import { spinner } from "../../../svgs";
import { GameWeekType } from "./types";
import GameList from "./components/GameList";

type ScheduleProps = {
  schedule: GameWeekType[] | null | Error;
  handleFetchSchedule: () => Promise<void>;
};
const Schedule = ({ schedule, handleFetchSchedule }: ScheduleProps) => {
  const locale = navigator.language;
  // gets the users locale to format the date correctly

  if (schedule instanceof Error)
    // error
    return (
      <ErrorWithBtn action={() => handleFetchSchedule()} error={schedule} />
    );

  if (!schedule) {
    // Loading
    return (
      <div className="relative rounded h-235 animate-pulse">{spinner}</div>
    );
  }

  return (
    <section className="schedule rounded h-max md:w-3/4 md:mx-auto sm:p-3">
      <h2 className="font-bold dark:text-stone-300 my-5 py-1 mx-2 text-2xl uppercase leading-tight tracking-wide select-none border-b border-gray-300 dark:border-stone-700">
        Schedule
      </h2>
      <GameList schedule={schedule} locale={locale} />
    </section>
  );
};

export default Schedule;
