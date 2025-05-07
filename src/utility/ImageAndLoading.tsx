import { spinner } from "../svgs";

const ImageAndLoading = ({ imgSrc }: { imgSrc: string }) => {
  return (
    <div
      className={`relative p-3 my-auto mx-1 rounded-full bg-gray-300 dark:bg-stone-700 shadow-md flex align-center justify-center`}
    >
      <img
        className="absolute rounded-full invisible w-14 h-14 bottom-0"
        loading="lazy"
        onLoad={(e) => {
          (e.target as HTMLImageElement).classList.remove("invisible");
          (
            (e.target as HTMLImageElement).nextSibling as HTMLElement
          ).classList.add("invisible");
        }}
        src={imgSrc}
        alt="Player Headshot"
      />
      {spinner}
    </div>
  );
};

export default ImageAndLoading;
