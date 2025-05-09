const DayScheduleSkeleton = () => {
  return (
    <div className="flex flex-col sm:mx-7 ">
      <div className="flex lex-row w-full mt-3 py-2 border-b border-gray-300 dark:border-stone-700">
        <h2 className="mx-2 sm:px-0 bg-stone-200 dark:bg-stone-800 animate-pulse w-50 h-6.5" />
      </div>
      <div className="flex flex-row w-full h-12 sm:h-16 rounded p-2 mt-1 animate-pulse bg-stone-200 dark:bg-stone-800 animate-pulse" />
      <div className="flex flex-row w-full h-12 sm:h-16 rounded p-2 mt-1 animate-pulse bg-stone-200 dark:bg-stone-800 animate-pulse" />
    </div>
  );
};

const ScheduleSkeleton = () => {
  return (
    <div className="section-loading h-max sm:p-5 w-full">
      <h2
        className="font-bold dark:text-stone-300 my-5 py-1 mx-2 text-xl uppercase leading-tight tracking-wide select-none
        border-b border-gray-300 dark:border-stone-700"
        aria-label="Loading Section"
      >
        Schedule
      </h2>
      <div className="flex flex-col w-full align-center justify-center content-">
        <DayScheduleSkeleton />
        <DayScheduleSkeleton />
        <DayScheduleSkeleton />
        <DayScheduleSkeleton />
      </div>
    </div>
  );
};

export default ScheduleSkeleton;
