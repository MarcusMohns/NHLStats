const SeriesSkeleton = () => (
  <div className="md:w-40 w-25 h-25 my-5 animate-pulse bg-stone-200 dark:bg-stone-800 rounded" />
);

const FinalsSkeleton = () => (
  <>
    <div className="md:w-40 w-30 h-20 animate-pulse bg-stone-200 dark:bg-stone-800 m-1 md:m-2 rounded" />
    <div className="md:w-40 w-30 h-50 animate-pulse bg-stone-200 dark:bg-stone-800 m-1 md:m-2 rounded" />
    <div className="md:w-40 w-30 h-20 animate-pulse bg-stone-200 dark:bg-stone-800 m-1 md:m-2 rounded" />
  </>
);

const BracketSkeleton = ({ direction }: { direction: string }) => {
  return (
    <div className={`flex flex-row h-full justify-around ${direction} grow`}>
      <div className="flex flex-col">
        <SeriesSkeleton />
        <SeriesSkeleton />
        <SeriesSkeleton />
        <SeriesSkeleton />
      </div>
      <div className="flex flex-col justify-around">
        <SeriesSkeleton />
        <SeriesSkeleton />
      </div>
    </div>
  );
};
const PlayoffsSkeleton = () => {
  return (
    <section className="playoffs h-max sm:p-5">
      <h2 className="font-bold dark:text-stone-300 my-5 py-1 mx-2 text-xl uppercase leading-tight tracking-wide select-none border-b border-gray-300 dark:border-stone-700">
        Playoffs
      </h2>
      <div className="dark:invert-0 w-[700px] mx-auto my-2 px-4 animate-pulse h-20 bg-stone-200 dark:bg-stone-800 rounded" />
      <div className="flex flex-col w-full">
        <div className="flex flex-row xl:hidden align-center justify-center items-center">
          <FinalsSkeleton />
        </div>
        <div className="flex align-center justify-center">
          <BracketSkeleton direction={"flex-row"} />
          <div className="hidden xl:flex flex-row align-center justify-center items-center">
            <FinalsSkeleton />
          </div>
          <BracketSkeleton direction={"flex-row-reverse"} />
        </div>
      </div>
    </section>

    // <div className="section-loading h-screen sm:p-5">
    //   <h2
    //     className="font-bold dark:text-stone-300 my-5 py-1 mx-2 text-xl uppercase leading-tight tracking-wide select-none
    //   border-b border-gray-300 dark:border-stone-700"
    //     aria-label="Loading Section"
    //   >
    //     Playoffs
    //   </h2>
    //   <div className="flex flex items-center justify-center pb-30 sm:p-5 sm:pb-60 w-full h-full">
    //     {spinner}
    //   </div>
    // </div>
  );
};

export default PlayoffsSkeleton;
