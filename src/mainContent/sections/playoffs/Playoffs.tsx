import { initialPlayoffsState } from "./store";

const Playoffs = () => {
  return (
    <section className="playoffs h-max  rounded sm:p-5 2xl:mb-5">
      <img
        src={initialPlayoffsState.bracketLogo}
        className="w-full h-40 object-contain rounded invert dark:invert-0"
      />
      <h2 className="font-bold dark:text-stone-300 my-5 py-1 sm:px-2 text-2xl uppercase leading-tight tracking-wide select-none"></h2>
    </section>
  );
};

export default Playoffs;
