import React, { useState, useEffect } from "react";
import { Alchemy, Network } from "alchemy-sdk";
import LoadingSpin from "react-loading-spin";

export default function NftsChecker() {
  // Alchemy SDK
  // Create an instance of Alchemy SDK using API key and network details
  const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  };
  const alchemy = new Alchemy(settings);

  // State variables for address, nftsCollection, loading indicator and whether to show NFTs
  const [address, setAddress] = useState("");
  const [nftsCollection, setNftsCollection] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showNfts, setShowNfts] = useState(false);

  // Use effect hook to fetch NFTs for owner when address changes
  useEffect(() => {
    // If address is empty, return
    if (!address) return;
    // Set the loading indicator to true
    setIsLoading(true);

    async function getNftsForOwner() {
      // Fetch NFTs collection for given address
      setNftsCollection(await alchemy.nft.getNftsForOwner(address));
      // Set the loading indicator to false
      setIsLoading(false);
      // Set the flag to display NFTs
      setShowNfts(true);
    }
    getNftsForOwner();
  }, [address]);

  return (
    <>
      <div className="mt-48 text-2xl font-bold text-center">NFTs tracker</div>
      <div className="flex flex-row justify-center mx-auto mt-12">
        <form className="w-full max-w-2xl">
          <div className="mb-6 md:flex md:items-center">
            <div className="md:w-1/3">
              <label
                className="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0"
                htmlFor="address"
              >
                Enter your address
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-indigo-500"
                id="address"
                type="text"
                placeholder="0x..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
        </form>
      </div>

      {showNfts && (
        <div className="max-w-lg py-10 mx-auto mt-20 mb-10 text-center border-2 border-indigo-600 bg-gray-50 rounded-3xl">
          {isLoading && (
            <LoadingSpin
              width="6px"
              direction="alternate"
              size="2rem"
              primaryColor="#4f46dd"
            />
          )}
          {!isLoading && (
            <>
              <div className="font-bold">
                {nftsCollection.totalCount} NFTs found
              </div>
              <ul>
                {nftsCollection.ownedNfts.map((nft, index) => (
                  <li key={index}>{nft.title}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </>
  );
}
