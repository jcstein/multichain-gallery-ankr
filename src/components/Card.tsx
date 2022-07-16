import { useEffect, useState } from "react";
import { IpfsImage } from "react-ipfs-image";
import { Attribute } from "@ankr.com/ankr.js/dist/types";

export interface CardProps {
  name?: string;
  imageSlug?: string;
  blockchain?: string;
  collection?: string;
  traits?: Attribute[];
}

export default function Card({
  name,
  imageSlug,
  blockchain,
  collection,
  traits,
}: CardProps) {
  const isImage =
    imageSlug?.split(".").pop() === "png" ||
    imageSlug?.split(".").pop() === "jpg";
  const isGif = imageSlug?.split(".").pop() === "gif";
  const isVideo = imageSlug?.split(".").pop() === "mp4";
  const isHash = imageSlug?.length === 46;
  const isHashUrl =
    imageSlug?.startsWith("ipfs://") ||
    imageSlug?.startsWith("https://ipfs.io/") ||
    imageSlug?.startsWith("https://ipfs.io/ipfs/");
  const [isVideoError, setIsVideoError] = useState(false);
  const isEmpty =
    imageSlug?.length === 0 || imageSlug === "https://ipfs.io/ipfs/";

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
          hash={imageSlug as string}
          onError={(i: any) => (i.target.style.display = "none")}
        />
      )}
      {isHashUrl && (
        <IpfsImage
          hash={imageSlug as string}
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
      {isEmpty && (
        <img
          src="https://raw.githubusercontent.com/jcstein/jpegs/main/image-not-found-01.png"
          alt="Image Not Found"
        />
      )}
      <div className="flex flex-col space-y-2 pt-2">
        <a target="_blank" href={imageSlug} rel="noreferrer">
          <span className="font-bold mt-4 text-sm">{name}</span>
        </a>
        <span className="text-sm sm:text-md">{collection}</span>
        <span className="text-white inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold font-bold text-[#356DF3]">
          <span className="uppercase">{blockchain}</span>
        </span>
        <span>
          {traits?.map((traits) => (
            <span className="inline-block bg-gray-200 rounded-xl px-2 py-1 text-xs font-semibold font-bold text-zinc-700 mx-1 my-1">
              <span className="capitalize">
                {traits.trait_type || "Lens Type"}
              </span>
              : {traits.value}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}
