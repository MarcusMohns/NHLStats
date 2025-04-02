type SelectTableButtonsProps = {
  buttons: string[];
  selectedTable: string;
  handleSelectedTable: (button: string) => void;
};
const SelectTableButtons = ({
  buttons,
  selectedTable,
  handleSelectedTable,
}: SelectTableButtonsProps) => {
  return (
    <ul className="flex sm:flex-wrap text-sm sm:text-base font-bold mt-5 text-center justify-center rounded-sm shadow-lg sm:ml-3 bg-gray-200 dark:bg-stone-800 w-full sm:w-fit">
      {buttons.map((button) => (
        <li className="w-1/4 h-full sm:w-max" key={button}>
          <button
            onClick={() => handleSelectedTable(button)}
            className={`sm:p-3 p-1 py-3 break-all w-full h-max hover:bg-gray-300 dark:hover:bg-stone-600 border-none cursor-pointer
             ${
               button === selectedTable
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
