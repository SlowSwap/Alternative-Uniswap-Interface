import React from "react";
import { Fab, Grid, makeStyles } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import * as COLORS from "@material-ui/core/colors";
import { ChevronDownIcon, SwitchHorizontalIcon } from '@heroicons/react/solid'
import { Coin } from "./CoinSwap";

const useStyles = makeStyles<{ [key: string]: any, }>((theme: any): any => ({
  container: {
    padding: theme.spacing(1),
    minHeight: "80px",
    backgroundColor: COLORS.grey[50],
    borderRadius: theme.spacing(2),
    borderColor: COLORS.grey[300],
    borderWidth: "1px",
    borderStyle: "solid",
  },
  container_input: {
    padding: theme.spacing(1),
    minHeight: "68px",
    backgroundColor: COLORS.grey[50],
    borderRadius: theme.spacing(2),
    borderColor: COLORS.grey[300],
    borderWidth: "1px",
    borderStyle: "solid",
    marginLeft: "50%",
    textAlign: "right",
  },
  container_blank: {
    padding: theme.spacing(1),
    minHeight: "80px",
    borderRadius: theme.spacing(2),
  },
  grid: {
    height: "60px",
  },
  fab: {
    zIndex: "0",
  },
  input: {
    ...theme.typography.h5,
    width: "100%",
  },
  inputBase: {
    textAlign: "right",
  },
}));


export function RemoveLiquidityField1(props: {
  onClick: () => any
  symbol: string,
  value: string,
  onChange: (e: any) => any
  activeField: boolean
  balance: string
}) {
  // This component is used to selecting a coin and entering a value, the props are explained below:
  //      onClick - (string) => void - Called when the button is clicked
  //      symbol - string - The text displayed on the button
  //      value - string - The value of the text field
  //      onChange - (e) => void - Called when the text field changes
  //      activeField - boolean - Whether text can be entered into this field or not

  const classes = useStyles();
  const { onClick, symbol, value, onChange, activeField } = props;
  return (
    <div>
      <div className="flex justify-between">
        {/* Button */}
        <div className="flex flex-row items-center justify-center">

          <button
            className="round-md shadow-sm bg-purple-500"
            onClick={onClick}
          >
            {symbol}
            <ExpandMoreIcon />
          </button>
          <div>
            {props.balance ? <>
              <div>
                Balance: {parseFloat(props.balance).toPrecision(8)}
              </div>
            </> : null}
          </div>

        </div>
        {/* Text Field */}

        <input
          value={value}
          onChange={onChange}
          placeholder="0.0"
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm  px-4 rounded-full"
          disabled={!activeField}
        />
        {/* </div> */}
      </div>
    </div>
  );
}

export function RemoveLiquidityField2(props: {
  onClick: () => any
  symbol: string,
  value: string,
  onChange: (e: any) => any
  activeField: boolean
  balance: string
}) {
  // This component is used to selecting a coin and entering a value, the props are explained below:
  //      onClick - (string) => void - Called when the button is clicked
  //      symbol - string - The text displayed on the button
  //      value - string - The value of the text field
  //      onChange - (e) => void - Called when the text field changes
  //      activeField - boolean - Whether text can be entered into this field or not

  const classes = useStyles();
  const { onClick, symbol } = props;

  return (
    <div className={classes.container_blank}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        className={classes.grid}
      >
        {/* Button */}
        <Grid item xs={3}>
          <Fab
            size="small"
            variant="extended"
            onClick={onClick}
            className={classes.fab}
          >
            {symbol}
            <ExpandMoreIcon />
          </Fab>
        </Grid>
      </Grid>
    </div>
  );
}

export default function CoinField(props: {
  onClick: () => any
  symbol: string,
  value: string,
  onChange: (e: any) => any
  activeField: boolean
  balance: string
}) {
  // This component is used to selecting a token and entering a value, the props are explained below:
  //      onClick - (string) => void - Called when the button is clicked
  //      symbol - string - The text displayed on the button
  //      value - string - The value of the text field
  //      onChange - (e) => void - Called when the text field changes
  //      activeField - boolean - Whether text can be entered into this field or not

  const { onClick, symbol, value, onChange, activeField } = props;

  return (
    <div className="min-h-30 w-full bg-slate-50 bg-opacity-40 py-3 px-4 rounded-lg shadow-md mb-1">
      <div className="flex justify-between gap-6">
        {/* Button */}
        <div className="flex flex-column items-start justify-between">

          <button
            className="inline-flex items-center px-3 py-2 bg-purple-500 hover:bg-purple-600 rounded-full shadow-sm text-bold text-white"
            onClick={onClick}
          >
            {symbol || "Select"}&nbsp;
            <ChevronDownIcon className="h-5 w-5 text-white" aria-hidden="true" />
          </button>
          <div>
            {props.balance ? <>
              <div className="mt-2 text-sm text-gray-500 font-medium">
                Balance:&nbsp;{parseFloat(props.balance).toFixed(2)}
              </div>
            </> : null}
          </div>

        </div>

        {/* Text Field */}
        <input
          value={value}
          onChange={onChange}
          placeholder="0.0"
          className="text-right bg-transparent text-purple-700 focus:outline-none block w-full text-2xl md:text-3xl px-4 rounded-full"
          disabled={!activeField}
        />
      </div>
    </div>
  );
}

export function PoolReserve(props: {
  coin1: Coin
  coin1Reserve: string
  coin2: Coin
  coin2Reserve: string
}) {
  const { coin1, coin1Reserve, coin2, coin2Reserve } = props;

  return (
    <>
      <div className="w-full text-sm text-gray-600 flex justify-center mb-1">
        <div className="">
          swap pool tokens
        </div>
      </div>
      <div className="w-full mx-auto text-xl text-gray-600 flex justify-center items-center mb-3">
        {coin1.symbol}&nbsp;{coin1Reserve}&nbsp;
        <SwitchHorizontalIcon className="h-5 w-5 text-gray-600 inline" aria-hidden="true" />&nbsp;
        {coin2Reserve}&nbsp;{coin2.symbol}
      </div>

      {/* TODO - show more details about the pool, link to add/remove liquidity */}
      {/* <div className="w-full flex justify-evenly items-center">

        <div className="text-2xl text-gray-700 font-medium">
          pool liquidity:
        </div>

        <div className="">
          <div className="flex justify-center items-center gap-2">
            <div className="">
              {coin1.symbol}:
            </div>
            <div className="" >
              {coin1Reserve}
            </div>
          </div>

          <div className="flex justify-center items-center gap-2">
            <div className="">
              {coin2.symbol}:
            </div>
            <div className="">
              {coin2Reserve}
            </div>
          </div>
        </div>

      </div> */}
    </>
  );
}

