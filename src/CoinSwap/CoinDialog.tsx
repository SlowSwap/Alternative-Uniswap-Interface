import React from "react";
import {
  Button,
  Dialog,
  Grid,
  IconButton,
  makeStyles,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";
import CoinButton from "./CoinButton";
import { doesTokenExist } from "../ethereumFunctions";
import * as COLORS from "@material-ui/core/colors";
import { CoinDef } from "constants/coins";

const styles: any = (theme: any): any => ({
  dialogContainer: {
    borderRadius: theme.spacing(2),
  },
  titleSection: {
    padding: theme.spacing(2),
  },
  titleText: {
    alignSelf: "center",
  },
  hr: {
    margin: 0,
  },
  address: {
    paddingLeft: theme.spacing(2.5),
    paddingRight: theme.spacing(2.5),
    paddingBottom: theme.spacing(2),
  },
  coinList: {
    height: 300,
    overflowY: "scroll" as any,
  },
  coinContainer: {
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
    paddingTop: theme.spacing(2),
    marginTop: theme.spacing(2),
    overflow: "hidden",
  },
});


// This is a modified version of MaterialUI's DialogTitle component, I've added a close button in the top right corner
const DialogTitle = (props: {
  onClose: () => void,
  children: any

}) => {
  const classes = makeStyles(styles)()
  const { children, onClose, ...other } = props;
  return (
    <MuiDialogTitle
      disableTypography
      className={classes.titleSection}
      {...other}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignContent="center"
      >
        <Typography variant="h6" className={classes.titleText}>
          {children}
        </Typography>
        {onClose ? (
          <IconButton aria-label="close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </Grid>
    </MuiDialogTitle>
  );
};

// This is a modified version of MaterialUI's DialogActions component, the color has been changed by modifying the CSS
const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    backgroundColor: COLORS.grey[100],
  },
}))(MuiDialogActions);


export default function CoinDialog(props: {
  onClose: (val: string) => any,
  open: boolean,
  coins: CoinDef[],
  signer: any
}) {
  // The CoinDialog component will display a dialog window on top of the page, allowing a user to select a coin
  // from a list (list can be found in 'src/constants/coins.js') or enter an address into a search field. Any entered
  // addresses will first be validated to make sure they exist.
  // When the dialog closes, it will call the `onClose` prop with 1 argument which will either be undefined (if the
  // user closes the dialog without selecting anything), or will be a string containing the address of a coin.

  const classes = makeStyles(styles)()
  const { onClose, open, coins, signer } = props;

  const [address, setAddress] = React.useState("");
  const [error, setError] = React.useState("");

  // Called when the user tries to input a custom address, this function will validate the address and will either
  // then close the dialog and return the validated address, or will display an error.
  const submit = () => {
    if (doesTokenExist(address, signer)) {
      exit(address);
    } else {
      setError("This address is not valid");
    }
  };

  // Resets any fields in the dialog (in case it's opened in the future) and calls the `onClose` prop
  const exit = (value: string) => {
    setError("");
    setAddress("");
    onClose(value);
  };

  return (
    <Dialog
      open={open}
      onClose={() => exit("")}
      fullWidth
      maxWidth="sm"
      classes={{ paper: classes.dialogContainer }}
    >
      <DialogTitle onClose={() => exit("")}>Select Coin</DialogTitle>

      <hr className={classes.hr} />

      <div className={classes.coinContainer}>
        <Grid container direction="column" spacing={1} alignContent="center">
          <TextField
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            variant="outlined"
            placeholder="Paste Address"
            error={error !== ""}
            helperText={error}
            fullWidth
            className={classes.address}
          />

          <hr className={classes.hr} />

          <Grid item className={classes.coinList}>
            <Grid container direction="column">
              {/* Maps all of the tokens in the constants file to buttons */}
              {coins.map((coin, index) => (
                <Grid item key={index} xs={12}>
                  <CoinButton
                    coinName={coin.name}
                    coinAbbr={coin.abbr}
                    onClick={() => exit(coin.address)}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>

      <hr className={classes.hr} />

      <DialogActions>
        <Button autoFocus onClick={submit} color="primary">
          Enter
        </Button>
      </DialogActions>
    </Dialog>
  );
}
