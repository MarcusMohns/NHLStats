import { spinner } from "../svgs";

const ImageAndLoading = ({ imgSrc }: { imgSrc: string }) => {
  return (
    <div
      className={`relative w-20 h-auto my-auto mx-1 rounded-full bg-gray-300 dark:bg-stone-700 shadow-md flex align-center justify-center`}
    >
      <img
        className="h-full w-full rounded-full invisible"
        loading="lazy"
        onLoad={(e) => {
          (e.target as HTMLImageElement).classList.remove("invisible");
          (
            (e.target as HTMLImageElement).nextSibling as HTMLElement
          ).classList.add("invisible");
        }}
        src={imgSrc}
      />
      {spinner}
    </div>
  );
};

export default ImageAndLoading;
