const LiveChip = ({ gameCenterLink }: { gameCenterLink: string }) => {
  return (
    <div className="flex flex-row items-center px-2 w-max rounded bg-green-700 hover:bg-green-600">
      <a
        className="text-white underline ml-auto flex flex-row text-xs items-center"
        href={`https://www.nhl.com${gameCenterLink}`}
        target="_blank"
      >
        Live
      </a>
      <span className="rounded-full bg-red-500 w-3 h-3 ml-1 animate-pulse block" />
    </div>
  );
};

export default LiveChip;
