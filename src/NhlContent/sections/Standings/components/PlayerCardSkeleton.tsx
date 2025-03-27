const PlayerCardSkeleton = () => {
  return (
    <div className="flex flex-row shadow-sm bg-slate-100 p-2 mt-2 w-full h-24 w-24 w-full animate-pulse">
      <img className="animate-pulse min-w-20 min-h-20 rounded-full bg-gray-300 " />
      <div className="w-full flex flex-col items-center justify-center">
        <div className="flex bg-gray-300 text-md text-gray-900 uppercase font-bold mb-2 w-40 h-8 animate-pulse"></div>

        <div className="grid grid-flow-col grid-rows-2 gap-1 font-medium">
          <div className="flex sm:mx-3 min-w-25 h-5 rounded bg-gray-300 animate-pulse" />
          <div className="flex sm:mx-3 min-w-25 h-5 rounded bg-gray-300 animate-pulse" />
          <div className="flex sm:mx-3 min-w-25 h-5 rounded bg-gray-300 animate-pulse" />
          <div className="flex sm:mx-3 min-w-25 h-5 rounded bg-gray-300 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default PlayerCardSkeleton;
