import { useState, useEffect } from "react";
import { getNfts } from "./main";
import { Nft } from "@ankr.com/ankr.js/dist/types";
import Card from "./components/Card";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useEnsName } from "wagmi";

const App = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [nfts, setNfts] = useState<Nft[]>([]);
  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address });

  const handleClick = async (address: string) => {
    const { nfts } = await getNfts(address);
    console.log({ nfts });
    setNfts(nfts);
  };

  useEffect(() => {
    setWalletAddress(ensName || (address as string));
    handleClick(ensName || (address as string));
    console.log({ walletAddress });
  }, [address]);

  return (
    <div className="flex flex-col justify-center bg-zinc-900 py-10 px-4 sm:px-8 md:px-10 lg:px-14 xl:px-20 2xl:px-44 min-h-screen">
      <header className="justify-center items-center text-white">
        <div className="flex justify-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl pb-10 font-bold text-center">
          Ankr Multichain ⛓🖼 NFT Gallery
        </div>
        <div className="flex flex-col mt-4 items-center text-center">
          <label
            className="text-white pb-5 text-sm sm:text-lg md:text-xl lg:text-2xl"
            htmlFor="wallet-address"
          >
            Enter an Ethereum Address, ENS Domain, Unstoppable Domain, or
            connect your wallet to view your NFTs
          </label>
          <input
            id="wallet-address"
            type="text"
            value={walletAddress}
            onChange={(wallet) => setWalletAddress(wallet.target.value)}
            className="rounded-xl p-2 w-full md:w-[427px] border text-zinc-700 truncate text-center text-sm sm:text-lg bg-zinc-100 hover:bg-zinc-200 transition-colors ease-in-out duration-200 mb-2"
            placeholder="0x...420 or vitalik.eth or joshcs.888"
          />
          <div className="mb-3">or</div>
          <div className="mb-5">
            <ConnectButton />
          </div>
          <button
            className="bg-[#36C98E] hover:scale-105 duration-300 ease-in-out mt-3 py-2 px-4 rounded-xl font-bold"
            onClick={() => handleClick(walletAddress)}
          >
            Submit
          </button>
        </div>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mt-8 gap-4 text-white bg-zinc-900">
        {nfts.map((nft) => {
          return (
            <div
              key={`${nft.contractAddress}/${nft.tokenId}`}
              className="flex flex-col rounded-xl border p-4 items-center text-center"
            >
              <Card
                name={nft.name}
                imageSlug={nft.imageUrl}
                blockchain={nft.blockchain}
                collection={nft.collectionName}
                traits={nft?.traits ?? []}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
