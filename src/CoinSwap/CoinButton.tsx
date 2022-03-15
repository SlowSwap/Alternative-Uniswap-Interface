import React from "react";
import { ButtonBase, Grid, makeStyles, Typography } from "@material-ui/core";


export default function CoinButton(props: {
  coinName: string,
  coinAbbr: string,
  onClick: (e: any) => void
}) {
  const { coinName, coinAbbr, onClick } = props;

  return (
    <ButtonBase
      focusRipple
      onClick={onClick}
    >
      <Grid container direction="column">
        <Typography variant="h6">{coinAbbr}</Typography>
        <Typography
          variant="body2"
        >
          {coinName}
        </Typography>
      </Grid>
    </ButtonBase>
  );
}
