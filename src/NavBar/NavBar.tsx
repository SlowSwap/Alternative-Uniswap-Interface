import React from "react";
import { Link } from "react-router-dom";
import {
  makeStyles,
  Typography,
} from "@material-ui/core";
import { MenuItems } from "./MenuItems";
import { pink } from "@material-ui/core/colors";

const styles: any = (theme) => ({
  fullWidth: {
    width: "100%",
  },
  title: {
    textAlign: "center",
    padding: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
    color: pink[500],
  },
  navBar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 60,
    width: '100%',
    listStyle: 'none',
    fontSize: 26,
    marginBottom: 40,
  },
  navLink: {
    textDecoration: 'none',
    color: '#ffffff'
  }
});

const useStyles = makeStyles(styles);
export default function NavBar() {
  const classes = useStyles();

  return (
    <nav>
      <div className={classes.title}>
        <Typography className={classes.title} variant="h1">SlowSwap</Typography>
      </div>

      {/* Test to see if Tailwind styles work: */}
      {/* <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1> */}

      <div >
        <ul className={classes.navBar}>
          {MenuItems.map((item, index) => {
            return (
              <li key={index}>
                <Link className={classes.navLink} to={item.url}>
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
