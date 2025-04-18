const PlayerCardSkeleton = () => {
  return (
    <div className="flex flex-row shadow-sm bg-slate-100  dark:bg-stone-800 shadow-sm p-2 mt-2 w-full h-24 w-24 w-full animate-pulse">
      <div className="animate-pulse min-w-20 min-h-20 rounded-full bg-gray-300 dark:bg-stone-900 shadow-md" />
      <div className="w-full flex flex-col items-center justify-center">
        <div className="flex bg-gray-300 dark:bg-stone-700 uppercase font-bold mb-2 w-40 h-8 animate-pulse" />
        <div className="grid grid-flow-col grid-rows-2 gap-1 font-medium">
          <div className="flex sm:mx-3 min-w-25 h-5 rounded bg-gray-300 dark:bg-stone-700 animate-pulse" />
          <div className="flex sm:mx-3 min-w-25 h-5 rounded bg-gray-300 dark:bg-stone-700 animate-pulse" />
          <div className="flex sm:mx-3 min-w-25 h-5 rounded bg-gray-300 dark:bg-stone-700 animate-pulse" />
          <div className="flex sm:mx-3 min-w-25 h-5 rounded bg-gray-300 dark:bg-stone-700 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default PlayerCardSkeleton;
