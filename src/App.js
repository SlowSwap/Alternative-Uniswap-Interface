import React from "react";
import "./App.css";
import Web3Provider from "./network";
import NarBar from "./NavBar/NavBar";
import CoinSwapper from "./CoinSwapper/CoinSwapper";
import { Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import Liquidity from "./Liquidity/Liquidity";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { deepPurple, pink } from "@material-ui/core/colors";

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: pink[500],
      contrastText: "#e8e8e8",
    },
    secondary: {
      main: deepPurple[500],
      contrastText: "#e8e8e8",
    },
  },
});

const App = () => {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          <Web3Provider
            render={(network) => (
              <div>
                <NarBar />
                <Route exact path="/">
                  <CoinSwapper network={network} />
                </Route>

                <Route exact path="/liquidity">
                  <Liquidity network={network} />
                </Route>
              </div>
            )}
          ></Web3Provider>
        </SnackbarProvider>
      </ThemeProvider>
    </div>
  );
};

export default App;
