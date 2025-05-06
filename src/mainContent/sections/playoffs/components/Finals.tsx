import { SeriesType } from "../types";
import Series from "./Series";
const Finals = ({ series }: { series: SeriesType[] }) => {
  return (
    <>
      {series.map((team, index) => (
        <Series key={index} series={team} />
      ))}
    </>
  );
};

export default Finals;
