import { moon, sun } from "./svgs";

type NavbarProps = {
  darkMode: boolean;
  handleDarkModeChange: () => void;
};

const Navbar = ({ handleDarkModeChange, darkMode }: NavbarProps) => {
  return (
    <div
      className="flex w-full flex-direction:row align-center p-4 border-b border-stone-300 dark:border-stone-900 
    bg-gradient-to-r from-stone-0 via-stone-200 to-stone-300 dark:bg-gradient-to-r dark:from-stone-700 dark:via-stone-800 dark:to-stone-900"
    >
      <img src="/images/hockey_puck.png" className="w-14 h-14" />
      <h1 className="ml-2 content-center dark:text-white text-3xl leading-tight tracking-wide font-bold">
        NHL Stats
      </h1>
      <div
        onClick={handleDarkModeChange}
        className="content-center color-white text-black dark:text-white ml-auto cursor-pointer p-5"
      >
        {darkMode ? moon : sun}
      </div>
    </div>
  );
};

export default Navbar;
