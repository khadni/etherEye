import React from "react";

export default function PrevBlockRow({
  number,
  timestamp,
  txns,
  miner,
  gasused,
}) {
  return (
    <tr className="transition duration-300 ease-in-out border-b bg-gray-50 hover:bg-gray-100">
      <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
        {number}
      </td>
      <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
        {timestamp}
      </td>
      <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
        {txns} txns
      </td>
      <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
        {miner}
      </td>
      <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
        {parseFloat(gasused).toLocaleString()}
      </td>
      <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
        {gasused > 15000000 ? (
          <div className="bg-green-100">Next block Gas Price will decrease</div>
        ) : (
          <div className="bg-red-100">Next block Gas Price will increase</div>
        )}
      </td>
    </tr>
  );
}
