type SelectTableButtonsProps = {
  buttons: string[];
  selectedTable: string;
  handleSelectedTable: (button: string) => void;
};
const SelectTableButtons = ({
  buttons = ["League", "Division", "Conference", "Wild Card"],
  selectedTable,
  handleSelectedTable,
}: SelectTableButtonsProps) => {
  return (
    <ul
      className="flex sm:flex-wrap text-sm sm:text-base font-bold mt-1 sm:rounded-sm 
    shadow-lg sm:ml-3 mx-5 sm:w-fit bg-stone-200 dark:bg-stone-800"
    >
      {buttons.map((button) => (
        <li className="w-full h-auto sm:w-max" key={button}>
          <button
            onClick={() => handleSelectedTable(button)}
            aria-pressed={button === selectedTable}
            aria-label={`Select ${button}`}
            className={`sm:p-3 p-1 py-3 w-full h-full hover:bg-gray-300 dark:hover:bg-stone-600 border-none cursor-pointer 
             ${
               button === selectedTable
                 ? "bg-gray-300 dark:bg-stone-600"
                 : "bg-gray-200 dark:bg-stone-800"
             } ${
              button === buttons[buttons.length - 1] &&
              "border-r-2 rounded-tr-sm rounded-br-sm"
            }
          ${button === buttons[0] && "border-l-2 rounded-bl-sm rounded-tl-sm"}
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
