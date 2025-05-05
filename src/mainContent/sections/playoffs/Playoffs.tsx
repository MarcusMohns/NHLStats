import Series from "./components/Series.tsx";
import { spinner } from "../../../svgs.tsx";
import ErrorWithBtn from "../../components/ErrorWithBtn.tsx";
import { PlayoffsType } from "./types.tsx";

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
    return (
      <div className="relative flex items-center justify-center content-center h-300 sm:p-5 bg-stone-100 dark:bg-stone-800 animate-pulse">
        {spinner}
      </div>
    );
  }

  const roundOneEastern = playoffs.series.slice(0, 4);
  const roundOneWestern = playoffs.series.slice(4, 8);
  const roundTwoEastern = playoffs.series.slice(8, 10);
  const roundTwoWestern = playoffs.series.slice(10, 12);
  const westernFinals = playoffs.series[12];
  const easternFinals = playoffs.series[13];
  const stanleyCupFinals = playoffs.series[14];

  return (
    <section className="playoffs w-full flex flex-col">
      <img
        src={playoffs.bracketLogo}
        className="w-full h-auto object-contain rounded invert dark:invert-0"
      />
      <div className="flex w-full h-auto justify-between align-between">
        <div className="w-1/5 md:w-1/7 h-auto">
          {roundOneWestern.map((series) => (
            <Series key={series.seriesUrl} series={series} />
          ))}
        </div>
        <div className="w-1/5 md:w-1/7 align-center justify-around flex flex-col h-auto">
          {roundTwoWestern.map((series) => (
            <Series key={series.seriesUrl} series={series} />
          ))}
        </div>
        <div className="flex flex-col align-center justify-center md:flex-row w-1/5 md:w-3/7 gap-2">
          <Series series={westernFinals} />
          <Series series={stanleyCupFinals} />
          <Series series={easternFinals} />
        </div>
        <div className="w-1/5 md:w-1/7 align-center justify-around flex flex-col h-auto">
          {roundTwoEastern.map((series) => (
            <Series key={series.seriesUrl} series={series} />
          ))}
        </div>
        <div className="w-1/5 md:w-1/7 h-full">
          {roundOneEastern.map((series) => (
            <Series key={series.seriesUrl} series={series} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Playoffs;
