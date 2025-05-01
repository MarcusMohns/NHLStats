import {
  playoffsIcon,
  standingsIcon,
  scheduleIcon,
  leaderboardIcon,
} from "../../svgs";

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
  const icons: Record<string, React.ReactElement> = {
    Standings: standingsIcon,
    Schedule: scheduleIcon,
    Leaderboard: leaderboardIcon,
    Playoffs: playoffsIcon,
  };

  return (
    <ul
      className="fixed bottom-0 left-0 z-2 bg-slate-300 dark:bg-stone-700 md:bg-transparent md:dark:bg-transparent 
    p-2 md:p-0 md:static flex flex-row justify-center md:justify-start w-full md:w-max md:mb-12 
   gap-2 md:gap-5 leading-tight tracking-wide select-none border-b-2 border-stone-300 dark:border-stone-700"
    >
      {buttons.map((button) => (
        <li key={button} className="mx-auto">
          <button
            onClick={() => handleSelectedTab(button)}
            className={`flex flex-col items-center cursor-pointer text-sm sm:text-base md:text-2xl font-bold text-stone-600 dark:text-stone-200 
            hover:text-stone-900 dark:hover:text-white mb-[-2px]
             ${
               button === selectedTab &&
               "border-b-2 border-stone-900 dark:border-white text-stone-900 dark:text-white"
             }`}
          >
            <span className="flex items-center flex-col lg:flex-row gap-2">
              {icons[button]} {button}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default SelectTabButtons;
