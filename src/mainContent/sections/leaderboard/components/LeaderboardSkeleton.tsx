const LeadersSkeleton = () => {
  return (
    <div className="w-full">
      <div className="animate-pulse mt-4 select-none px-2 w-28 h-8 bg-stone-200 dark:bg-stone-800 ml-2" />
      <div className="w-8/10 sm:w-45 mx-auto sm:mx-2 h-12 rounded bg-stone-200 dark:bg-stone-800 mt-2 animate-pulse" />
      <div className="animate-pulse mt-3 select-none w-22 h-8 bg-stone-200 dark:bg-stone-800 ml-2" />
      <div className="py-2 my-3 bg-stone-200 dark:bg-stone-800 rounded w-full animate-pulse h-26" />
      <div className="py-2 my-3 bg-stone-200 dark:bg-stone-800 rounded w-full animate-pulse h-26" />
      <div className="py-2 my-3 bg-stone-200 dark:bg-stone-800 rounded w-full animate-pulse h-26" />
      <div className="py-2 my-3 bg-stone-200 dark:bg-stone-800 rounded w-full animate-pulse h-26" />
      <div className="py-2 my-3 bg-stone-200 dark:bg-stone-800 rounded w-full animate-pulse h-26" />
    </div>
  );
};

const LeaderboardSkeleton = () => (
  <div className="section-loading h-max sm:p-5 w-full">
    <h2
      className="font-bold dark:text-stone-300 my-5 py-1 mx-2 text-xl uppercase leading-tight tracking-wide select-none
        border-b border-gray-300 dark:border-stone-700"
      aria-label="Loading Section"
    >
      Leaderboard
    </h2>
    <div className="flex flex-col xl:flex-row w-full gap-5">
      <LeadersSkeleton />
      <LeadersSkeleton />
    </div>
  </div>
);

export default LeaderboardSkeleton;
