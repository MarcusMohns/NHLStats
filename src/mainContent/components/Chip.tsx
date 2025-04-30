import { ReactElement } from "react";

type ChipProps = {
  color: string;
  bgColor: string;
  children: ReactElement | string | number;
};
const Chip = ({ color, bgColor, children }: ChipProps) => {
  return (
    <div
      className={`flex justify-center items-center ${color} ${bgColor} rounded-full px-2 text-xs font-semibold text-sm`}
    >
      {children}
    </div>
  );
};

export default Chip;
