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
    <ul className="fixed bottom-0 left-0 z-2 border-t md:border-none bg-stone-200 dark:bg-stone-700 md:bg-transparent md:dark:bg-transparent py-3 md:p-0 md:static flex flex-row justify-center md:justify-start w-full md:w-max text-sm sm:text-base font-bold md:mb-12 border-solid border-b-2 border-gray-300 dark:border-stone-600 gap-5">
      {buttons.map((button) => (
        <li className="md:text-3xl" key={button}>
          <button
            onClick={() => handleSelectedTab(button)}
            className={`cursor-pointer
               ${button === selectedTab && " border-b-2 md:border-b-3"}`}
          >
            {button.toUpperCase()}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default SelectTabButtons;
