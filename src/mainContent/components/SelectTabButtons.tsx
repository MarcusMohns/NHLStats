type SelectTabButtonsProps = {
  buttons: string[];
  selectedTable: string;
  handleSelectedTab: (button: string) => void;
};
const SelectTabButtons = ({
  buttons,
  selectedTable,
  handleSelectedTab,
}: SelectTabButtonsProps) => {
  return (
    <ul className="flex sm:flex-wrap text-sm sm:text-base font-bold mb-12">
      {buttons.map((button) => (
        <li className="mx-3 text-3xl" key={button}>
          <button
            onClick={() => handleSelectedTab(button)}
            className={`cursor-pointer
               ${
                 button === selectedTable
                   ? "border-gray-300 dark:border-stone-600"
                   : "border-gray-300 dark:border-stone-600"
               }`}
          >
            {button.toUpperCase()}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default SelectTabButtons;
