import { SeriesType } from "../types";
import Series from "./Series.tsx";
const Bracket = ({
  roundOne,
  roundTwo,
  direction,
}: {
  roundOne: SeriesType[];
  roundTwo: SeriesType[];
  direction: string;
}) => {
  return (
    <div className={`flex flex-row h-full justify-around ${direction} grow`}>
      <div className="flex flex-col">
        {roundOne.map((team, index) => (
          <Series key={index} series={team} />
        ))}
      </div>
      <div className="flex flex-col justify-around">
        {roundTwo.map((team, index) => (
          <Series key={index} series={team} />
        ))}
      </div>
    </div>
  );
};

export default Bracket;
