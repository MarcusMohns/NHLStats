import { spinner } from "../../svgs";

const LoadingSpinner = ({ heading }: { heading: string }) => {
  return (
    <div className="section-loading h-screen sm:p-5">
      <h2
        className="font-bold dark:text-stone-300 my-5 py-1 mx-2 text-xl uppercase leading-tight tracking-wide select-none 
      border-b border-gray-300 dark:border-stone-700"
        aria-label="Loading Section"
      >
        {heading}
      </h2>
      <div className="flex flex items-center justify-center pb-30 sm:p-5 sm:pb-60 w-full h-full">
        {spinner}
      </div>
    </div>
  );
};

export default LoadingSpinner;
