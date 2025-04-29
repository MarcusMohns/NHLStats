type SelectTabButtonsProps = {
  buttons: string[];
  selectedTab: string;
  handleSelectedTab: (button: string) => void;
};
const SelectTabButtons = ({
  buttons,
  selectedTab,
  handleSelectedTab,
}: SelectTabButtonsProps) => {
  return (
    <ul
      className="fixed bottom-0 left-0 z-2 border-t md:border-t-0 border-b-2 border-stone-300 dark:border-stone-700 bg-gray-200 dark:bg-gray-700 md:bg-transparent md:dark:bg-transparent 
    p-3 md:p-0 md:static flex flex-row justify-center md:justify-start w-full md:w-max text-xs sm:text-base md:text-lg font-bold md:mb-12 
    gap-3 md:gap-5 leading-tight tracking-wide select-none"
    >
      {buttons.map((button) => (
        <li className="md:text-2xl mx-auto" key={button}>
          <button
            onClick={() => handleSelectedTab(button)}
            className={`cursor-pointer uppercase
               ${
                 button === selectedTab &&
                 "border-b-2 border-stone-500 dark:border-stone-100"
               }`}
          >
            {button}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default SelectTabButtons;
