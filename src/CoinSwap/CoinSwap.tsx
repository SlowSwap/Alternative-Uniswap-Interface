import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import SwapVerticalCircleIcon from "@material-ui/icons/SwapVerticalCircle";
import { useSnackbar } from "notistack";
import {
  getAmountOut,
  getBalanceAndSymbol,
  swapTokens,
  getReserves,
  getDecimals,
} from "../ethereumFunctions";
import CoinField from "./CoinField";
import CoinDialog from "./CoinDialog";
import LoadingButton from "../Components/LoadingButton";
import WrongNetwork from "../Components/wrongNetwork";
import { Contract, ethers } from "ethers";
import ProgressBar from '@ramonak/react-progress-bar'
import TestToken from "../Components/TestTokens";
import { Network } from "network";

// Webpack 5
const worker = new Worker(new URL("../workers/vdf.worker.ts", import.meta.url));

const ERC20 = require("../build/ERC20.json");

const styles: any = (theme: any): any => ({
  paperContainer: {
    borderRadius: theme.spacing(2),
    padding: theme.spacing(1),
    paddingBottom: theme.spacing(3),
  },
  switchButton: {
    zIndex: 1,
    margin: "-16px",
    padding: theme.spacing(0.5),
  },
  fullWidth: {
    width: "100%",
  },
  title: {
    textAlign: "center",
    padding: theme.spacing(0.5),
    marginBottom: theme.spacing(1),
  },
  hr: {
    width: "100%",
  },
  balance: {
    padding: theme.spacing(1),
    overflow: "wrap",
    textAlign: "center",
  },
  footer: {
    width: "100%",
    marginTop: 40
  },
});

const useStyles = makeStyles<{ [key: string]: any }>(styles);

type Coin = {
  address: string
  symbol: string
  balance: string
}

interface CoinSwapProps {
  network: Network
}

function CoinSwap(props: CoinSwapProps) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  // Stores a record of whether their respective dialog window is open
  const [dialog1Open, setDialog1Open] = React.useState(false);
  const [dialog2Open, setDialog2Open] = React.useState(false);
  const [wrongNetworkOpen] = React.useState(false);
  const [progressBarValue, setProgressBarValue] = useState(0)

  // Stores data about their respective coin
  const [coin1, setCoin1] = React.useState<Coin>({
    address: "",
    symbol: "",
    balance: "",
  });
  const [coin2, setCoin2] = React.useState<Coin>({
    address: "",
    symbol: "",
    balance: "",
  });

  // Stores the current reserves in the liquidity pool between coin1 and coin2
  const [reserves, setReserves] = React.useState<[string, string, string]>(['0', '0', '0']);

  // Stores the current value of their respective text box
  const [field1Value, setField1Value] = React.useState<string>("");
  const [field2Value, setField2Value] = React.useState<string>("");

  // Controls the loading button
  const [loading, setLoading] = React.useState(false);

  // Switches the top and bottom coins, this is called when users hit the swap button or select the opposite
  // token in the dialog (e.g. if coin1 is TokenA and the user selects TokenB when choosing coin2)
  const switchFields = () => {
    setCoin1(coin2);
    setCoin2(coin1);
    setField1Value(field2Value);
    let reversed: [string, string, string] = [reserves[2], reserves[1], reserves[0]]
    setReserves(reversed);
  };

  // These functions take an HTML event, pull the data out and puts it into a state variable.
  const handleChange = {
    field1: (e: any) => {
      setField1Value(e.target.value);
    },
  };

  // Turns the account's balance into something nice and readable
  const formatBalance = (balance: string, symbol: string) => {
    if (balance && symbol)
      return parseFloat(balance).toPrecision(8) + " " + symbol;
    else return "0.0";
  };

  // Turns the coin's reserves into something nice and readable
  const formatReserve = (reserve: string, symbol: string) => {
    if (reserve && symbol) return reserve + " " + symbol;
    else return "0.0";
  };

  // Determines whether the button should be enabled or not
  const isButtonEnabled = () => {

    // If both coins have been selected, and a valid float has been entered which is less than the user's balance, then return true
    const parsedInput1 = parseFloat(field1Value);
    const parsedInput2 = parseFloat(field2Value);
    return (
      coin1.address &&
      coin2.address &&
      !isNaN(parsedInput1) &&
      !isNaN(parsedInput2) &&
      0 < parsedInput1 &&
      parsedInput1 <= Number(coin1.balance)
    );
  };

  // Called when the dialog window for coin1 exits
  const onToken1Selected = (address: string) => {
    // Close the dialog window
    setDialog1Open(false);

    // If the user inputs the same token, we want to switch the data in the fields
    if (address === coin2.address) {
      switchFields();
    }
    // We only update the values if the user provides a token
    else if (address) {
      // Getting some token data is async, so we need to wait for the data to return, hence the promise
      getBalanceAndSymbol(props.network.account, address, props.network.provider, props.network.signer, props.network.weth.address, props.network.coins).then((data) => {
        setCoin1({
          address: address,
          symbol: data.symbol,
          balance: data.balance,
        });
      });
    }
  };

  // Called when the dialog window for coin2 exits
  const onToken2Selected = (address: string) => {
    // Close the dialog window
    setDialog2Open(false);

    // If the user inputs the same token, we want to switch the data in the fields
    if (address === coin1.address) {
      switchFields();
    }
    // We only update the values if the user provides a token
    else if (address) {
      // Getting some token data is async, so we need to wait for the data to return, hence the promise
      getBalanceAndSymbol(props.network.account, address, props.network.provider, props.network.signer, props.network.weth.address, props.network.coins).then((data) => {
        setCoin2({
          address: address,
          symbol: data.symbol,
          balance: data.balance,
        });
      });
    }
  };

  function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : ((r & 0x3) | 0x8);
      return v.toString(16);
    });
  }


  // Calls the swapTokens Ethereum function to make the swap, then resets nessicary state variables
  const swap = async () => {
    setLoading(true);

    const amount = field1Value
    const origin = props.network.account

    const token1 = new Contract(coin1.address, ERC20.abi, props.network.signer);
    const tokenDecimals = await getDecimals(token1);
    const amountIn = ethers.utils.parseUnits(amount, tokenDecimals);

    let knownQtyIn = amountIn.toString()
    let knownQtyOut = '0' // this UI only allows known quantity in, so out will always be 0

    // TODO - do this better, make it work for non-direct paths
    const path = [
      coin1.address,
      coin2.address
    ]

    const [N, T] = await Promise.all([
      props.network.router.N(),
      props.network.router.T()
    ])



    const id = uuid();
    // const id = crypto.randomBytes(32).toString('hex')

    const blockNumber = await props.network.provider.getBlockNumber()
    console.log('blockNumber', blockNumber)
    const block = await props.network.provider.getBlock(blockNumber)
    const blockHash = block.hash


    worker.onmessage = ev => {

      const output = ev.data
      if (output.id !== id) {
        return
      }

      setProgressBarValue(Math.round(output.progress * 100))
      if (output.proof) {
        console.log("got proof", output.proof)
        console.log("Attempting to swap tokens...");
        swapTokens(
          coin1.address,
          coin2.address,
          field1Value,
          props.network.router,
          props.network.account,
          props.network.signer,
          output.proof
        )
          .then(() => {
            setLoading(false);
            // If the transaction was successful, we clear to input to make sure the user doesn't accidental redo the transfer
            setField1Value("");
            enqueueSnackbar("Transaction Successful", { variant: "success" });
          })
          .catch((e) => {
            setLoading(false);
            enqueueSnackbar("Transaction Failed (" + e.message + ")", {
              variant: "error",
              autoHideDuration: 10000,
            });
          });
      }
    }
    worker.postMessage({
      id,
      n: N.toString(),
      t: T.toNumber(),
      blockHash,
      blockNumber,
      knownQtyIn,
      knownQtyOut,
      origin,
      path
    })
  };

  // The lambdas within these useEffects will be called when a particular dependency is updated. These dependencies
  // are defined in the array of variables passed to the function after the lambda expression. If there are no dependencies
  // the lambda will only ever be called when the component mounts. These are very useful for calculating new values
  // after a particular state change, for example, calculating the new exchange rate whenever the addresses
  // of the two coins change.

  // This hook is called when either of the state variables `coin1.address` or `coin2.address` change.
  // This means that when the user selects a different coin to convert between, or the coins are swapped,
  // the new reserves will be calculated.
  useEffect(() => {
    console.log(
      "Trying to get Reserves between:\n" + coin1.address + "\n" + coin2.address
    );

    if (coin1.address && coin2.address) {
      getReserves(coin1.address, coin2.address, props.network.factory, props.network.signer, props.network.account).then(
        (data) => setReserves(data)
      );
    }
  }, [coin1.address, coin2.address, props.network.account, props.network.factory, props.network.router, props.network.signer]);

  // This hook is called when either of the state variables `field1Value` `coin1.address` or `coin2.address` change.
  // It attempts to calculate and set the state variable `field2Value`
  // This means that if the user types a new value into the conversion box or the conversion rate changes,
  // the value in the output box will change.
  useEffect(() => {
    if (isNaN(parseFloat(field1Value))) {
      setField2Value("");
    } else if (parseFloat(field1Value) && coin1.address && coin2.address) {
      getAmountOut(coin1.address, coin2.address, field1Value, props.network.router, props.network.signer).then(
        (amount) => setField2Value(amount.toFixed(7))
      ).catch(e => {
        console.log(e);
        setField2Value("NA");
      })
    } else {
      setField2Value("");
    }
  }, [field1Value, coin1.address, coin2.address, props.network.router, props.network.signer]);

  // This hook creates a timeout that will run every ~10 seconds, it's role is to check if the user's balance has
  // updated has changed. This allows them to see when a transaction completes by looking at the balance output.
  useEffect(() => {
    const coinTimeout = setTimeout(() => {
      console.log('props: ', props);
      console.log("Checking balances...");

      if (coin1.address && coin2.address && props.network.account) {
        getReserves(
          coin1.address,
          coin2.address,
          props.network.factory,
          props.network.signer,
          props.network.account
        ).then((data) => setReserves(data));
      }

      if (coin1.address && props.network.account && !wrongNetworkOpen) {
        getBalanceAndSymbol(
          props.network.account,
          coin1.address,
          props.network.provider,
          props.network.signer,
          props.network.weth.address,
          props.network.coins
        ).then(
          (data) => {
            console.log('data: ', data)
            setCoin1({
              ...coin1,
              balance: data.balance,
            });
          }
        );
      }
      if (coin2.address && props.network.account && !wrongNetworkOpen) {
        getBalanceAndSymbol(
          props.network.account,
          coin2.address,
          props.network.provider,
          props.network.signer,
          props.network.weth.address,
          props.network.coins
        ).then(
          (data) => {
            setCoin2({
              ...coin2,
              balance: data.balance,
            });
          }
        );
      }
    }, 10000);

    return () => clearTimeout(coinTimeout);
  });

  return (
    <div>
      {/* Dialog Windows */}
      <CoinDialog
        open={dialog1Open}
        onClose={onToken1Selected}
        coins={props.network.coins}
        signer={props.network.signer}
      />
      <CoinDialog
        open={dialog2Open}
        onClose={onToken2Selected}
        coins={props.network.coins}
        signer={props.network.signer}
      />
      <WrongNetwork
        open={wrongNetworkOpen}
      />

      {/* Coin Swapper */}
      <Container maxWidth="xs">
        <Paper className={classes.paperContainer}>

          <Grid container direction="column" alignItems="center" spacing={2}>
            <Grid item xs={12} className={classes.fullWidth}>
              <CoinField
                activeField={true}
                value={field1Value}
                onClick={() => setDialog1Open(true)}
                onChange={handleChange.field1}
                symbol={coin1.symbol !== undefined ? coin1.symbol : "Select"}
              />
            </Grid>

            <IconButton onClick={switchFields} className={classes.switchButton}>
              <SwapVerticalCircleIcon fontSize="medium" />
            </IconButton>

            <Grid item xs={12} className={classes.fullWidth}>
              <CoinField
                activeField={false}
                value={field2Value}
                onClick={() => setDialog2Open(true)}
                symbol={coin2.symbol !== undefined ? coin2.symbol : "Select"}
                onChange={() => { }}
              />
            </Grid>

            <hr className={classes.hr} />

            {/* Balance Display */}
            <Typography variant="h6">Your Balances</Typography>
            <Grid container direction="row" justifyContent="space-between">
              <Grid item xs={6}>
                <Typography variant="body1" className={classes.balance}>
                  {formatBalance(coin1.balance, coin1.symbol)}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" className={classes.balance}>
                  {formatBalance(coin2.balance, coin2.symbol)}
                </Typography>
              </Grid>
            </Grid>

            <hr className={classes.hr} />

            {/* Reserves Display */}
            <Typography variant="h6">Reserves</Typography>
            <Grid container direction="row" justifyContent="space-between">
              <Grid item xs={6}>
                <Typography variant="body1" className={classes.balance}>
                  {formatReserve(reserves[0], coin1.symbol)}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" className={classes.balance}>
                  {formatReserve(reserves[1], coin2.symbol)}
                </Typography>
              </Grid>
            </Grid>

            <hr className={classes.hr} />

            {loading ?
              <div className={classes.fullWidth}>
                <ProgressBar
                  completed={progressBarValue}
                  labelSize={'12px'}
                  transitionDuration={'0.2s'}
                  labelAlignment={'right'}
                  labelColor={'#ffffff'}
                />

              </div>
              : <LoadingButton
                loading={loading}
                valid={isButtonEnabled()}
                success={false}
                fail={false}
                onClick={swap}
              >
                🦥&nbsp;Swap
              </LoadingButton>
            }
          </Grid>
        </Paper>
      </Container>

      <Grid
        container
        className={classes.footer}
        direction="row"
        justifyContent="center"
        alignItems="flex-end"
      >
        <TestToken network={props.network} />
      </Grid>
    </div>
  );
}

export default CoinSwap;