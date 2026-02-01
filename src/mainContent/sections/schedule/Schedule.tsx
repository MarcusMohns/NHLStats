import ErrorWithBtn from "../../components/ErrorWithBtn";
import { GameWeekType } from "./types";
import GameList from "./components/GameList";
import ScheduleSkeleton from "./components/ScheduleSkeleton.tsx";
import { useEffect } from "react";
type ScheduleProps = {
  schedule: GameWeekType[] | null | Error;
  handleFetchSchedule: () => Promise<void>;
};
const Schedule = ({ schedule, handleFetchSchedule }: ScheduleProps) => {
  const locale = navigator.language || "sv-SE";

  useEffect(() => {
    if (!schedule) handleFetchSchedule();
  }, [handleFetchSchedule, schedule]);

  if (schedule instanceof Error)
    // error
    return (
      <ErrorWithBtn action={() => handleFetchSchedule()} error={schedule} />
    );

  if (!schedule) {
    // loading
    return <ScheduleSkeleton />;
  }

  return (
    <section className="schedule h-max sm:p-5">
      <h2 className="font-bold dark:text-stone-300 my-5 py-1 mx-2 text-xl uppercase leading-tight tracking-wide select-none border-b border-gray-300 dark:border-stone-700">
        Schedule
      </h2>
      <GameList schedule={schedule} locale={locale} />
    </section>
  );
};

export default Schedule;
