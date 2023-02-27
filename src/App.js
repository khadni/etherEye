import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Routes } from "react-router";
import Navbar from "./components/navbar";
import Blocktable from "./pages";
import BalanceChecker from "./pages/balanceChecker";
import NftsChecker from "./pages/nftsChecker";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Blocktable />} />
        <Route exact path="/balance-checker" element={<BalanceChecker />} />
        <Route exact path="/nfts-checker" element={<NftsChecker />} />
      </Routes>
    </Router>
  );
}

export default App;
