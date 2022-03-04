import React from "react";
import { ButtonGroup, Button } from "@material-ui/core";

export default function SwitchButton(props) {
  const { setDeploy } = props;

  const changeStyles = (K) => {
    if (K === true) {
      let add_button = document.getElementById("add-button");
      if (add_button) {
        add_button.style.backgroundColor = "#ff0000";
      }

      let remove_button = document.getElementById("remove-button");
      if (remove_button) {
        remove_button.style.backgroundColor = "#9e9e9e";
      }
    } else {
      let remove_button = document.getElementById("remove-button");
      if (remove_button) {
        remove_button.style.backgroundColor = "#ff0000";
      }

      let add_button = document.getElementById("add-button");
      if (add_button) {
        add_button.style.backgroundColor = "#9e9e9e";
      }
    }
  };

  return (
    <div>
      <ButtonGroup size="large" variant="contained">
        <Button
          id="add-button"
          color="primary"
          onClick={() => {
            setDeploy(true);
            changeStyles(true);
          }}
        >
          Deploy Liquidity
        </Button>

        <Button
          id="remove-button"
          color="secondary"
          onClick={() => {
            setDeploy(false);
            changeStyles(false);
          }}
        >
          Remove Liquidity
        </Button>
      </ButtonGroup>
    </div>
  );
}
