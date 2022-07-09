import { useEffect, useState } from "react";
import { getNfts } from "./main";
import { Nft } from "@ankr.com/ankr.js/dist/types";
import Card from "./components/Card";

const App = () => {
  const [walletAddress, setWalletAddress] = useState("joshcs.eth");
  const [nfts, setNfts] = useState<Nft[]>([]);

  useEffect(() => {
    (async () => {
      const { nfts } = await getNfts(walletAddress);
      console.log({ nfts });
      setNfts(nfts);
    })();
  }, [walletAddress]);

  return (
    <div className="flex flex-col justify-center bg-zinc-900 py-10 px-4 sm:px-8 md:px-10 lg:px-14 xl:px-20 2xl:px-44 min-h-screen">
      <header className="justify-center items-center text-white">
        <div className="flex justify-center text-lg sm:text-2xl md:text-3xl lg:text-4xl pb-10 font-bold font-mono">
          🖼 Ankr Multichain ⛓ NFT Gallery 🖼
        </div>
        <div className="flex flex-col mt-4 items-center">
          <label
            className="text-white pb-5 text-base font-mono sm:text-lg md:text-xl lg:text-2xl"
            htmlFor="wallet-address"
          >
            enter an Ethereum wallet address or ENS
          </label>
          <input
            id="wallet-address"
            type="text"
            value={walletAddress}
            onChange={(jpegs) => setWalletAddress(jpegs.target.value)}
            className="rounded p-2 w-full md:w-[427px] border text-zinc-700 truncate text-center font-mono text-sm sm:text-lg"
            placeholder="0x...420 or vitalik.eth"
          />
        </div>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mt-8 gap-4 text-white bg-zinc-900">
        {nfts.map((nft) => {
          return (
            <div
              key={`${nft.contractAddress}/${nft.tokenId}`}
              className="flex flex-col rounded border p-4 items-center text-center"
            >
              <Card
                name={nft.name}
                imageSlug={nft.imageUrl}
                blockchain={nft.blockchain}
                collection={nft.collectionName}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
