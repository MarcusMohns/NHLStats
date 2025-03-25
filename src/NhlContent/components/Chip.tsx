import { ReactElement } from "react";

const Chip = ({
  color,
  bgColor,
  children,
}: {
  color: string;
  bgColor: string;
  children: ReactElement | string | number;
}) => {
  return (
    <div
      className={`flex justify-center items-center text-${color} bg-${bgColor}-500 rounded-full px-2 text-xs font-semibold text-sm`}
    >
      {children}
    </div>
  );
};

export default Chip;
