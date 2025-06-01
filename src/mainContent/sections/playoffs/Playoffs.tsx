import ErrorWithBtn from "../../components/ErrorWithBtn.tsx";
import { PlayoffsType } from "./types.tsx";
import Bracket from "./components/Bracket.tsx";
import Finals from "./components/Finals.tsx";
import PlayoffsSkeleton from "./components/PlayoffsSkeleton.tsx";

type PlayoffsProps = {
  playoffs: PlayoffsType | Error | null;
  handleFetchPlayoffs: () => Promise<void>;
};

const Playoffs = ({ playoffs, handleFetchPlayoffs }: PlayoffsProps) => {
  if (playoffs instanceof Error)
    // Error
    return (
      <ErrorWithBtn action={() => handleFetchPlayoffs()} error={playoffs} />
    );

  if (!playoffs) {
    // loading
    return <PlayoffsSkeleton />;
  }
  const roundOneEasternTop = playoffs.series.slice(0, 2);
  const roundOneEasternBottom = playoffs.series.slice(2, 4);
  const roundOneWesternTop = playoffs.series.slice(4, 6);
  const roundOneWesternBottom = playoffs.series.slice(6, 8);
  const roundTwoEasternTop = playoffs.series[8];
  const roundTwoEasternBottom = playoffs.series[9];
  const roundTwoWesternTop = playoffs.series[10];
  const roundTwoWesternBottom = playoffs.series[11];

  const easternFinals = playoffs.series[12];
  const westernFinals = playoffs.series[13];
  const stanleyCupFinals = playoffs.series[14];

  return (
    <section className="playoffs h-max sm:p-5">
      <h2 className="font-bold dark:text-stone-300 my-5 py-1 mx-2 text-xl uppercase leading-tight tracking-wide select-none border-b border-gray-300 dark:border-stone-700">
        Playoffs
      </h2>
      <img
        src={playoffs.bracketLogo}
        className="invert dark:invert-0 w-[700px] mx-auto my-5 sm:my-0 px-4"
        alt="NHL Playoff Bracket Logo"
      />
      <div className="flex flex-col w-full">
        <div className="flex align-center justify-center">
          <Bracket
            roundOne={roundOneWesternTop}
            roundTwo={roundTwoWesternTop}
            direction="flex-row lg:border-none border-r-2 border-gray-300 dark:border-stone-700"
          />

          <Bracket
            roundOne={roundOneEasternTop}
            roundTwo={roundTwoEasternTop}
            direction="flex-row-reverse"
          />
        </div>
        <div className="flex align-center justify-center my-5 lg:my-0">
          <Finals series={[westernFinals, stanleyCupFinals, easternFinals]} />
        </div>
        <div className="flex align-center justify-center">
          <Bracket
            roundOne={roundOneWesternBottom}
            roundTwo={roundTwoWesternBottom}
            direction="flex-row lg:border-none border-r-2 border-gray-300 dark:border-stone-700"
          />
          <Bracket
            roundOne={roundOneEasternBottom}
            roundTwo={roundTwoEasternBottom}
            direction="flex-row-reverse"
          />
        </div>
      </div>
    </section>
  );
};

export default Playoffs;
