import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import AnkrscanProvider from "@ankr.com/ankr.js";

const provider = new AnkrscanProvider("");

export const getNfts = async (address: string) => {
  const { assets } = await provider.getNFTsByOwner({
    walletAddress: address,
    pageSize: 50,
  });
  return {
    nfts: assets,
  };
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
