import ErrorWithBtn from "../../components/ErrorWithBtn.tsx";
import { PlayoffsType } from "./types.tsx";
import Bracket from "./components/Bracket.tsx";
import Finals from "./components/Finals.tsx";
import SectionLoading from "../../components/SectionLoading.tsx";

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
    return <SectionLoading heading={"Playoffs"} />;
  }

  const roundOneEastern = playoffs.series.slice(0, 4);
  const roundOneWestern = playoffs.series.slice(4, 8);
  const roundTwoEastern = playoffs.series.slice(8, 10);
  const roundTwoWestern = playoffs.series.slice(10, 12);
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
        <div className="flex xl:hidden align-center justify-center">
          <Finals series={[westernFinals, stanleyCupFinals, easternFinals]} />
        </div>
        <div className="flex align-center justify-center">
          <Bracket
            roundOne={roundOneWestern}
            roundTwo={roundTwoWestern}
            direction="flex-row"
          />
          <div className="hidden xl:flex align-center justify-center">
            <Finals series={[westernFinals, stanleyCupFinals, easternFinals]} />
          </div>
          <Bracket
            roundOne={roundOneEastern}
            roundTwo={roundTwoEastern}
            direction="flex-row-reverse"
          />
        </div>
      </div>
    </section>
  );
};

export default Playoffs;
