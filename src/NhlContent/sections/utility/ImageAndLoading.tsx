import { spinner } from "../../components/svgs";

type ImageAndLoadingProps = {
  imgSrc: string;
  height: string;
  width: string;
  minHeight: string;
  minWidth: string;
};

const ImageAndLoading = ({
  imgSrc,
  height,
  width,
  minHeight,
  minWidth,
}: ImageAndLoadingProps) => {
  return (
    <div
      className={`relative ${height} ${width} ${minHeight} ${minWidth} rounded-full bg-gray-300 dark:bg-stone-700 shadow-md flex flex align-center justify-center`}
    >
      <img
        className="w-full h-full rounded-full invisible"
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
