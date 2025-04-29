import ErrorWithBtn from "../../components/ErrorWithBtn";
import { spinner } from "../../../svgs";
import { GameWeekType } from "./store";
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
      <div className="relative bg-stone-100 dark:bg-stone-900 shadow-md rounded h-235 animate-pulse">
        {spinner}
      </div>
    );
  }

  return (
    <section className="schedule bg-stone-100 dark:bg-stone-900 shadow-md rounded h-max md:w-3/4 md:mx-auto sm:p-3">
      <h2 className="font-bold dark:text-stone-300 my-5 py-1 mx-2 text-2xl uppercase leading-tight tracking-wide select-none">
        Schedule
      </h2>
      <GameList schedule={schedule} locale={locale} />
    </section>
  );
};

export default Schedule;
