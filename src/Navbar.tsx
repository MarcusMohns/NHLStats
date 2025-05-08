import { moon, sun } from "./svgs";

type NavbarProps = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

const Navbar = ({ toggleDarkMode, darkMode }: NavbarProps) => {
  return (
    <div
      className="flex w-full flex-direction:row align-center items-center p-4  
    bg-gray-200 dark:bg-stone-800"
    >
      <div
        className="rounded bg-stone-900 dark:bg-stone-700 p-1 text-white"
        aria-hidden="true"
      >
        🏒
      </div>
      <div className="ml-2 content-center dark:text-white text-2xl leading-tight tracking-wide font-bold select-none">
        NHL Stats
      </div>
      <button
        onClick={toggleDarkMode}
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        className="content-center color-white text-black dark:text-white ml-auto cursor-pointer sm:mr-5"
      >
        {darkMode ? moon : sun}
      </button>
    </div>
  );
};

export default Navbar;
