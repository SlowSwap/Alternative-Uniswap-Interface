import React from "react";
import "./App.css";
import Web3Provider from "./network";
import NavBar from "./NavBar/NavBar";
import CoinSwap from "./CoinSwap/CoinSwap";
import { Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import Liquidity from "./Liquidity/Liquidity";
import TestToken from "Components/TestTokens";


const App = () => {
  return (
    <div className="min-h-full flex flex-col justify-center sm:px-6 lg:px-8">
      <SnackbarProvider maxSnack={3}>
        <Web3Provider
          render={(network) => (
            <div>
              <NavBar />
              <Route exact path="/">
                <CoinSwap network={network} />
              </Route>

              <Route exact path="/liquidity">
                <Liquidity network={network} />
              </Route>

              {/* {network.chainID && network.chainID !== 1 && network.chainID !== 137 && ( */}
              <TestToken network={network} />
              {/* )} */}
            </div>
          )}
        />
      </SnackbarProvider>
    </div>
  );
};

export default App;
