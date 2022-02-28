import React, { useState, useEffect } from 'react'
import { Button, Container, Paper, Typography, makeStyles, } from "@material-ui/core";
import { getDecimals } from '../ethereumFunctions';
import { Contract, ethers } from 'ethers';
import { grey } from '@material-ui/core/colors';

const TestERC20 = require("../build/TestERC20.json");

const styles = (theme) => ({
    paperContainer: {
        borderRadius: theme.spacing(2),
        padding: theme.spacing(1),
        paddingBottom: theme.spacing(3),
        background: grey[400],
        width: 396
    },
    centered: {
        width: "100%",
        display: 'flex',
        gap: 8,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexWrap: 'wrap'
    },

});
const useStyles = makeStyles(styles);

export default function TestToken(props) {
    const classes = useStyles();
    const [loading, setLoading] = useState(false)
    const [coins, setCoins] = useState([])

    const { network } = props;
    useEffect(() => {
        let coins = network.coins || []
        const testCoins = coins.filter(coin => coin.abbr.includes("TEST"))
        setCoins(testCoins)

    }, [network.coins])

    const mintTestToken = async (address) => {
        setLoading(true)
        const token1 = new Contract(address, TestERC20.abi, network.signer);
        const tokenDecimals = await getDecimals(token1);

        const amount = 1000
        const fullAmount = ethers.utils.parseUnits(String(amount), tokenDecimals);

        await token1.mint(fullAmount)
        await token1.approve(network.router.address, fullAmount)
        setLoading(false)
    }
    return (
        <div>
            <Container maxWidth="xs">
                <Paper className={classes.paperContainer}>
                    <div className={classes.centered}>
                        <Typography variant="h6" style={{ marginBottom: 20 }}>Mint + approve test tokens</Typography>
                    </div>
                    <div className={classes.centered}>
                        {coins.map(coin =>
                            <Button
                                key={coin.address}
                                variant="contained"
                                color="secondary"
                                disabled={loading}
                                onClick={() => mintTestToken(coin.address)}
                            >
                                {coin.abbr}
                            </Button>
                        )}
                    </div>
                </Paper>
            </Container>
        </div>
    );
}
