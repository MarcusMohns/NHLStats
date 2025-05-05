import { initialPlayoffsState } from "./store";
import Series from "./components/Series.tsx";

const Playoffs = () => {
  const roundOneEastern = initialPlayoffsState.series.slice(0, 4);
  const roundOneWestern = initialPlayoffsState.series.slice(4, 8);
  const roundTwoEastern = initialPlayoffsState.series.slice(8, 10);
  const roundTwoWestern = initialPlayoffsState.series.slice(10, 12);
  const westernFinals = initialPlayoffsState.series[12];
  const easternFinals = initialPlayoffsState.series[13];
  const stanleyCupFinals = initialPlayoffsState.series[14];

  return (
    <section className="playoffs h-max rounded lg:p-5 2xl:mb-5 h-full">
      <img
        src={initialPlayoffsState.bracketLogo}
        className="w-full h-40 object-contain rounded invert dark:invert-0"
      />
      <div className="grid grid-cols-7 gap-2 sm:gap-4 h-100">
        <div className="grid grid-rows-4 ">
          {roundOneWestern.map((series) => (
            <Series key={series.seriesUrl} series={series} />
          ))}
        </div>
        <div className="grid grid-rows-2">
          {roundTwoWestern.map((series) => (
            <Series key={series.seriesUrl} series={series} />
          ))}
        </div>
        <div className="grid grid-rows-3">
          <div className="grid grid-rows-1">
            <Series series={westernFinals} />
          </div>
          <div className="grid grid-rows-1">
            <Series series={stanleyCupFinals} />
          </div>
          <div className="grid grid-rows-1">
            <Series series={easternFinals} />
          </div>
        </div>
        <div className="grid grid-rows-2 ">
          {roundTwoEastern.map((series) => (
            <Series key={series.seriesUrl} series={series} />
          ))}
        </div>
        <div className="grid grid-rows-4 ">
          {roundOneEastern.map((series) => (
            <Series key={series.seriesUrl} series={series} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Playoffs;
