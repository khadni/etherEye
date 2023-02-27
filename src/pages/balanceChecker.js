import React, { useState, useEffect } from "react";
import { Alchemy, Network } from "alchemy-sdk";
import LoadingSpin from "react-loading-spin";

export default function BalanceChecker() {
  // Alchemy SDK - create an instance
  const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  };
  const alchemy = new Alchemy(settings);

  // Set state for the address input, balance, loading indicator and whether to show the balance
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showBalance, setShowBalance] = useState(false);

  // Use useEffect to fetch the balance when the address changes
  useEffect(() => {
    async function getBalance() {
      if (address) {
        setIsLoading(true);
        setBalance(await alchemy.core.getBalance(address, "latest"));
        setShowBalance(true);
      }
    }
    getBalance();
    setIsLoading(false);
  }, [address, alchemy.core]);

  return (
    <>
      <div className="mt-48 text-2xl font-bold text-center">
        ETH balance checker
      </div>
      {/* Display a form to input an Ethereum address */}
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

      {/* Display the ETH balance, if the balance has been retrieved */}
      {showBalance && (
        <div className="max-w-lg py-10 mx-auto mt-20 text-center border-2 border-indigo-600 bg-gray-50 rounded-3xl">
          <div className="text-lg">Your ETH balance is</div>
          {/* Show a loading spinner while the balance is being retrieved */}
          {isLoading && (
            <LoadingSpin
              width="6px"
              direction="alternate"
              size="2rem"
              primaryColor="#4f46dd"
            />
          )}
          {!isLoading && (
            <div className="font-bold">
              {balance.toString() / 1000000000000000000} ETH
            </div>
          )}
        </div>
      )}
    </>
  );
}
