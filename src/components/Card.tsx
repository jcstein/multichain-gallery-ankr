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
  const isHashUrl =
    imageSlug?.startsWith("ipfs://") ||
    imageSlug?.startsWith("https://ipfs.io/ipfs/") ||
    imageSlug?.startsWith("ipfs.io/ipfs/");

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
          hash="{imageSlug}"
          onError={(i: any) => (i.target.style.display = "none")}
        />
      )}
      {isHashUrl && (
        <IpfsImage
          hash="{imageSlug}"
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
          <video loop autoPlay hidden muted src={imageSlug} />
          {/* <div>
            {this.state.video ? (
              <video loop autoPlay hidden muted src={imageSlug} />
            ) : null}
          </div> */}
          {/* img and video has an error event
like video.addEventListener('error', onError, true);
video variable you can find by ref (if react) or Document.querySelector if native js
onError is a function and you can implement any logic there
Also, I would research an npm plugin with such option lmao instead of writing it manually 
You can try poster attribute
<video poster="<your image poster>"/>
*/}
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
