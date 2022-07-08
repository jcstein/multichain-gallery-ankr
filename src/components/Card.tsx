import { IpfsImage } from "react-ipfs-image";

export interface CardProps {
  name?: string;
  imageSlug?: string;
  blockchain?: string;
  collection?: string;
}

export default function Card({
  name,
  imageSlug,
  blockchain,
  collection,
}: CardProps) {
  const isImage = imageSlug?.split(".").pop() === "png";
  const isGif = imageSlug?.split(".").pop() === "gif";
  const isVideo = imageSlug?.split(".").pop() === "mp4";
  const isIpfs = imageSlug?.split("").pop() === "";
  //   const isLens = imageSlug?.split(".").pop() === ".ipfs.infura-ipfs.io";

  return (
    <div>
      {isImage && <img src={imageSlug} alt={name} />}
      {isGif && <img src={imageSlug} alt={name} />}
      {isVideo && (
        <video loop autoPlay muted>
          <source src={imageSlug} />
        </video>
      )}
      {isIpfs && (
        <IpfsImage
          hash={imageSlug}
          alt={name}
          onError={(i: any) => (i.target.style.display = "none")}
        />
      )}
      {!isVideo && !isGif && !isImage && !isIpfs && (
        <div>
          <img
            src={imageSlug}
            alt={name}
            onError={(i: any) => (i.target.style.display = "none")}
          />
          <IpfsImage
            hash="{imageSlug}"
            alt={name}
            onError={(i: any) => (i.target.style.display = "none")}
          />
          {/* I only want this to render if there is no image */}
          <video loop autoPlay hidden muted>
            <source src={imageSlug} />
          </video>
        </div>
      )}
      {/* {isLens && (
        <video loop autoPlay hidden muted>
          <source src={imageSlug} />
        </video>
      )} */}
      <div className="flex flex-col space-y-2 pt-2">
        <a target="_blank" href={imageSlug} rel="noreferrer">
          <span className="font-bold mt-4 text-base sm:text-lg">{name}</span>
        </a>
        <span className="text-sm sm:text-md">{collection}</span>
        <span className="uppercase text-xs sm:text-sm font-mono font-bold text-[#356DF3]">
          <span className="text-white capitalize">Chain: </span>
          {blockchain}
        </span>
      </div>
    </div>
  );
}
