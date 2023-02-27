import React from "react";
import { useState, useEffect } from "react";
import { Alchemy, Network } from "alchemy-sdk";
import LoadingSpin from "react-loading-spin";
import PrevBlockRow from "../components/blocktable/prevBlockRow";

export default function Blocktable() {
  // Alchemy SDK
  // https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
  const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  };
  const alchemy = new Alchemy(settings);

  // Define state variables using useState
  const [isLoading, setIsLoading] = useState(true);
  const [blockNumber, setBlockNumber] = useState();
  const [block, setBlock] = useState();
  const [txnsLength, setTxnsLength] = useState();
  const [miner, setMiner] = useState();
  const [date, setDate] = useState();

  const [prevBlocksNumbers, setPrevBlocksNumbers] = useState([]);
  const [prevBlocks, setPrevBlocks] = useState([]);
  const [prevBlocksTimeStamps, setPrevBlocksTimeStamps] = useState([]);

  // Define an effect to fetch the current block number
  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }
    getBlockNumber();
  }, []);

  // Define an effect to calculate the previous block numbers
  useEffect(() => {
    const newPrevBlocksNumbers = [];
    for (let i = 1; i < 10; i++) {
      newPrevBlocksNumbers.push(blockNumber - i);
    }
    setPrevBlocksNumbers(newPrevBlocksNumbers);
  }, [blockNumber]);

  // Define an effect to fetch the current block data
  useEffect(() => {
    async function getBlock() {
      setBlock(await alchemy.core.getBlock(blockNumber));
      setIsLoading(true);
    }
    getBlock();
  }, [blockNumber]);

  // Define an effect to update the component state with the current block data
  useEffect(() => {
    if (!block) {
      return;
    }
    setTxnsLength(block.transactions.length);
    setMiner(block.miner);
    setDate(new Date(block.timestamp * 1000).toLocaleString());
  }, [block]);

  // Define an effect to fetch the previous block data
  useEffect(() => {
    async function getPrevBlocks() {
      const newPrevBlocks = [];
      for (let i = 0; i < 10; i++) {
        newPrevBlocks.push(await alchemy.core.getBlock(prevBlocksNumbers[i]));
      }
      setPrevBlocks(newPrevBlocks);
    }
    getPrevBlocks();
  }, [prevBlocksNumbers]);

  // Define an effect to update the component state with the previous block data
  useEffect(() => {
    if (prevBlocks.length === 0) {
      return;
    }
    const newPrevBlocksTimeStamps = [];
    for (let i = 0; i < 10; i++) {
      newPrevBlocksTimeStamps.push(
        new Date(prevBlocks[i].timestamp * 1000).toLocaleString()
      );
    }
    setPrevBlocksTimeStamps(newPrevBlocksTimeStamps);
    setIsLoading(false);
  }, [prevBlocks]);

  return (
    <div className="flex flex-row justify-center mx-auto mt-32">
      <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            {isLoading && (
              <div>
                <div className="px-6 py-4 text-center">
                  <LoadingSpin
                    width="6px"
                    direction="alternate"
                    size="2rem"
                    primaryColor="#4f46dd"
                  />
                </div>
              </div>
            )}
            {!isLoading && (
              <table className="min-w-full">
                <thead className="bg-indigo-600 border-b">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-4 text-sm font-medium text-left text-white"
                    >
                      Latest blocks
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-sm font-medium text-left text-white"
                    >
                      Timestamp
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-sm font-medium text-left text-white"
                    >
                      # Txns
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-sm font-medium text-left text-white"
                    >
                      Miner
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-sm font-medium text-left text-white"
                    >
                      Gas used
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-sm font-medium text-left text-white"
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="transition duration-300 ease-in-out border-b bg-gray-50 hover:bg-gray-100">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                      {blockNumber}
                    </td>
                    <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                      {date}
                    </td>
                    <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                      {txnsLength} txns
                    </td>
                    <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                      {miner}
                    </td>
                    <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                      {parseFloat(block.gasUsed).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                      {block.gasUsed &&
                      block.gasUsed.toLocaleString() > 15000000 ? (
                        <div className="bg-green-100">
                          Next block Gas Price will decrease
                        </div>
                      ) : (
                        <div className="bg-red-100">
                          Next block Gas Price will increase
                        </div>
                      )}
                    </td>
                  </tr>

                  {prevBlocksNumbers.map((number, index) => (
                    <PrevBlockRow
                      key={index}
                      number={number}
                      timestamp={prevBlocksTimeStamps[index]}
                      txns={prevBlocks[index].transactions.length}
                      miner={prevBlocks[index].miner}
                      gasused={prevBlocks[index].gasUsed}
                    />
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
