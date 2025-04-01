type SelectTableButtonsProps = {
  buttons: string[];
  selectedStandings: string;
  handleSetSelectedStandings: (button: string) => void;
};
const SelectTableButtons = ({
  buttons,
  selectedStandings,
  handleSetSelectedStandings,
}: SelectTableButtonsProps) => {
  return (
    <ul
      className="flex flex-wrap text-sm sm:text-base  font-bold my-5 text-center rounded-sm shadow-lg sm:ml-3
    ring ring-stone-300 dark:ring-stone-800 
    w-full sm:w-max
    bg-gray-200 dark:bg-stone-800"
    >
      {buttons.map((button) => (
        <li className="w-1/4 h-full sm:w-max" key={button}>
          <button
            onClick={() => handleSetSelectedStandings(button)}
            className={`sm:p-3 p-1 py-3 break-all w-full h-max hover:bg-gray-300 dark:hover:bg-stone-600 border-none dark:text-white cursor-pointer
             ${
               button === selectedStandings
                 ? "bg-gray-300 dark:bg-stone-600"
                 : "bg-gray-200 dark:bg-stone-800"
             } ${
              button === buttons.at(-1) &&
              "border-r-2 rounded-tr-sm rounded-br-sm"
            }
          ${
            button === buttons.at(0) && "border-l-2 rounded-bl-sm rounded-tl-sm"
          }
        `}
          >
            {button}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default SelectTableButtons;
