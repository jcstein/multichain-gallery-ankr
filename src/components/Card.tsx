import { useEffect, useState } from "react";
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
  const isImage =
    imageSlug?.split(".").pop() === "png" ||
    imageSlug?.split(".").pop() === "jpg";
  const isGif = imageSlug?.split(".").pop() === "gif";
  const isVideo = imageSlug?.split(".").pop() === "mp4";
  const isHash = imageSlug?.length === 46;
  const isHashUrl = imageSlug?.startsWith("ipfs://");

  const [isVideoError, setIsVideoError] = useState(false);

  useEffect(() => {
    setIsVideoError(false);
  }, [imageSlug]);

  return (
    <div>
      {isImage && (
        <img
          src={imageSlug}
          alt={name}
          onError={(i: any) => (i.target.style.display = "none")}
        />
      )}
      {isGif && (
        <img
          src={imageSlug}
          alt={name}
          onError={(i: any) => (i.target.style.display = "none")}
        />
      )}
      {isVideo && <video loop autoPlay hidden muted src={imageSlug} />}
      {isHash && (
        <IpfsImage
          hash={imageSlug}
          onError={(i: any) => (i.target.style.display = "none")}
        />
      )}
      {isHashUrl && (
        <IpfsImage
          hash={imageSlug}
          onError={(i: any) => (i.target.style.display = "none")}
        />
      )}
      {!isVideo && !isGif && !isImage && (
        <div>
          <img
            src={imageSlug}
            alt={name}
            onError={(i: any) => (i.target.style.display = "none")}
          />
          {!isVideoError && (
            <video
              loop
              autoPlay
              hidden
              muted
              src={imageSlug}
              onError={() => setIsVideoError(true)}
            />
          )}
        </div>
      )}
      <div className="flex flex-col space-y-2 pt-2">
        <a target="_blank" href={imageSlug} rel="noreferrer">
          <span className="font-bold mt-4 text-base sm:text-lg">{name}</span>
        </a>
        <span className="text-sm sm:text-md">{collection}</span>
        <span className="uppercase text-xs sm:text-sm font-mono font-bold text-[#356DF3]">
          <span className="text-white">Chain: </span>
          {blockchain}
        </span>
      </div>
    </div>
  );
}
