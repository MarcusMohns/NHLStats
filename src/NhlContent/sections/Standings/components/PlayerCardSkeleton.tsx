const PlayerCardSkeleton = () => {
  return (
    <div className="flex flex-row shadow-sm bg-slate-100 p-2 mt-2 w-full h-24 w-24 animate-pulse">
      <img className="animate-pulse w-31 h-20 rounded-full bg-gray-300 " />
      <div className="flex flex-col items-center justify-center">
        <div className="flex bg-gray-300 text-md text-gray-900 uppercase font-bold mb-2 w-40 animate-pulse"></div>
        <div className="flex ml-12 gap-1 flex-row flex-wrap font-medium ">
          <div className="flex mx-4 min-w-25 h-7 rounded bg-gray-300 animate-pulse" />
          <div className="flex mx-4 min-w-25 h-7 rounded bg-gray-300 animate-pulse" />
          <div className="flex mx-4 min-w-25 h-7 rounded bg-gray-300 animate-pulse" />
          <div className="flex mx-4 min-w-30 h-7 rounded bg-gray-300 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default PlayerCardSkeleton;
