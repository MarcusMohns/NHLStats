import { moon, sun } from "./svgs";

type NavbarProps = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

const Navbar = ({ toggleDarkMode, darkMode }: NavbarProps) => {
  return (
    <div
      className="flex w-full flex-direction:row align-center items-center p-4  
    bg-gradient-to-r from-stone-200 via-stone-400 to-stone-300 dark:bg-gradient-to-r dark:from-stone-800 dark:via-stone-900 dark:to-stone-800 shadow-[1.0px_4.0px_4.0px_rgba(0,0,0,0.38)]"
    >
      <div className="rounded bg-stone-900 dark:bg-stone-700 p-1 text-white">
        🏒
      </div>
      <h1 className="ml-2 content-center dark:text-white text-2xl leading-tight tracking-wide font-bold select-none">
        NHL Stats
      </h1>
      <div
        onClick={toggleDarkMode}
        className="content-center color-white text-black dark:text-white ml-auto cursor-pointer sm:mr-5"
      >
        {darkMode ? moon : sun}
      </div>
    </div>
  );
};

export default Navbar;
