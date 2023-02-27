import React from "react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 flex justify-around w-full py-4 shadow-md bg-white/80 backdrop-blur-md">
      {/* <!-- Logo Container --> */}
      <div className="flex items-center">
        {/* <!-- Logo --> */}
        <a href="/" className="cursor-pointer">
          <div className="text-2xl font-medium text-blue-500">
            <img
              className="object-cover h-20"
              src="./ehereye-logo.png"
              alt="Logo"
            />
          </div>
        </a>
      </div>

      {/* <!-- Links Section --> */}
      <div className="items-center hidden space-x-8 lg:flex">
        <a
          href="/"
          className="flex font-semibold text-gray-600 transition-colors duration-300 cursor-pointer hover:text-indigo-600"
        >
          Latest ETH Mainnet blocks
        </a>
        <a
          href="/balance-checker"
          className="flex font-semibold text-gray-600 transition-colors duration-300 cursor-pointer hover:text-indigo-600"
        >
          Track your ETH balance
        </a>
        <a
          href="/nfts-checker"
          className="flex font-semibold text-gray-600 transition-colors duration-300 cursor-pointer hover:text-indigo-600"
        >
          Track your NFTs
        </a>
      </div>
    </nav>
  );
}
