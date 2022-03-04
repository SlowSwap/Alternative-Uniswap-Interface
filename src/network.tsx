import React, { useEffect, useState, useRef } from "react";
import { ethers } from "ethers";
import ConnectWalletPage from "./Components/connectWalletPage";
import {
  getAccount,
  getFactory,
  getRouter,
  getNetwork,
  getWeth,
} from "./ethereumFunctions";
import COINS, { CoinDef } from "./constants/coins";
import * as chains from "./constants/chains";

export interface Network {
  provider: ethers.providers.Web3Provider
  signer: any
  account: any
  coins: CoinDef[]
  chainID: number
  router: any
  factory: any
  weth: any
}

const Web3Provider = (props: any) => {
  const [isConnected, setConnected] = useState(true);
  let network: Network = {
    provider: useRef(null) as any,
    signer: useRef(null) as any,
    account: useRef(null) as any,
    coins: [],
    chainID: useRef(null) as any,
    router: useRef(null) as any,
    factory: useRef(null) as any,
    weth: useRef(null) as any,
  }

  const backgroundListener = useRef<NodeJS.Timer>();
  async function setupConnection() {
    try {
      console.log('lets go!');
      network.provider = new ethers.providers.Web3Provider(window.ethereum);
      network.signer = await network.provider.getSigner();
      await getAccount().then(async (result) => {
        network.account = result;
      });

      await getNetwork(network.provider).then(async (chainId) => {
        // Set chainID
        network.chainID = chainId;
        if (chains.networks.includes(chainId)) {
          // Get the router using the chainID
          network.router = await getRouter(
            chains.routerAddress.get(chainId),
            network.signer
          );
          // Get default coins for network
          network.coins = COINS.get(chainId) || []
          // Get Weth address from router
          await network.router.WETH().then((wethAddress: string) => {
            network.weth = getWeth(wethAddress, network.signer);
            // Set the value of the weth address in the default coins array
            network.coins[0].address = wethAddress;
          });
          // Get the factory address from the router
          await network.router.factory().then((factory_address: string) => {
            network.factory = getFactory(
              factory_address,
              network.signer
            );
          });
          setConnected(true);
        } else {
          console.log("Wrong network mate.");
          setConnected(false);
        }
      });

    } catch (e) {
      console.log(e);
    }
  }

  async function createListener() {
    return setInterval(async () => {
      console.log("Heartbeat");
      try {
        // Check the account has not changed
        const account = await getAccount();
        if (account !== network.account) {
          await setupConnection();
        }
        // const chainID = await getNetwork(network.provider);
        // if (chainID !== network.chainID){
        //   setConnected(false);
        //   await setupConnection();
        // }
      } catch (e) {
        setConnected(false);
        await setupConnection();
      }
    }, 2000);
  }

  useEffect(() => {
    const asyncWork = async () => {
      // Initial setup
      console.log("Initial hook");
      await setupConnection();
      console.log("network: ", network);

      // Start background listener
      if (backgroundListener.current != null) {
        clearInterval(backgroundListener.current);
      }
      const listener = await createListener();
      backgroundListener.current = listener;
      return function cleanup() {
        if (backgroundListener.current) {
          clearInterval(backgroundListener.current)
        }
      }
    }
    asyncWork()
    // eslint-disable-next-line
  }, [network]);

  const renderNotConnected = () => {
    console.log("Rendering");
    return (
      <div className="App" >
        <div>
          <ConnectWalletPage />
        </div>
      </div>
    );
  };

  return (
    <>
      {!isConnected && renderNotConnected()}
      {
        isConnected && <div>{props.render(network)} </div>}
    </>
  );
};

export default Web3Provider;
