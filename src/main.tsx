import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import AnkrscanProvider from "@ankr.com/ankr.js";
import "@rainbow-me/rainbowkit/styles.css";
import {
  connectorsForWallets,
  wallet,
  RainbowKitProvider,
  midnightTheme,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
  [chain.mainnet],
  [
    jsonRpcProvider({
      rpc: () => {
        return {
          http: "https://rpc.ankr.com/eth",
        };
      },
    }),
    publicProvider(),
  ]
);

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      wallet.metaMask({ chains, shimDisconnect: true }),
      wallet.walletConnect({ chains }),
      wallet.coinbase({ appName: "Vite React RainbowKit Starter App", chains }),
      wallet.rainbow({ chains }),
    ],
  },
  {
    groupName: "Others",
    wallets: [
      wallet.argent({ chains }),
      wallet.brave({
        chains,
        shimDisconnect: true,
      }),
      wallet.imToken({ chains }),
      wallet.injected({
        chains,
        shimDisconnect: true,
      }),
      wallet.ledger({
        chains,
        // infuraId: null,
      }),
      wallet.steak({ chains }),
      wallet.trust({ chains, shimDisconnect: true }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider,
});

const ankrProvider = new AnkrscanProvider("");

export const getNfts = async (address: string) => {
  const { assets } = await ankrProvider.getNFTsByOwner({
    walletAddress: address,
    pageSize: 50,
  });
  return {
    nfts: assets,
  };
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={midnightTheme()} coolMode>
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);
