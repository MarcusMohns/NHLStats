const StandingsSkeleton = () => {
  return (
    <div className="section-loading h-max sm:p-5 w-full">
      <h2
        className="font-bold dark:text-stone-300 my-5 py-1 mx-2 text-xl uppercase leading-tight tracking-wide select-none
        border-b border-gray-300 dark:border-stone-700"
        aria-label="Loading Section"
      >
        Standings
      </h2>
      <div className="flex flex-col w-full gap-1">
        <div className="w-9/10 sm:w-95 mx-auto sm:mx-2 h-12 rounded bg-stone-200 dark:bg-stone-800 animate-pulse" />
        <div className="w-20 h-7 my-5 pt-3 px-1 animate-pulse bg-stone-200 dark:bg-stone-800" />
        {[...Array(15)].map((_, index) => (
          <div
            key={index}
            className="w-full h-15 animate-pulse bg-stone-200 dark:bg-stone-800"
          />
        ))}
      </div>
    </div>
  );
};

export default StandingsSkeleton;
