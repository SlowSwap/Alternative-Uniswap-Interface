import React, { useState, useEffect } from 'react'
import { Button, CircularProgress } from "@material-ui/core";
import { getDecimals } from '../ethereumFunctions';
import { Contract, ethers } from 'ethers';

const TestERC20 = require("../build/TestERC20.json");

export default function TestToken(props) {
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
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            {coins.map(coin =>
                <Button
                    key={coin.address}
                    variant="contained"
                    color="secondary"
                    disabled={loading}
                    onClick={() => mintTestToken(coin.address)}
                >
                    Mint+Approve:&nbsp;{coin.abbr}
                </Button>
            )}
            {loading && <CircularProgress size={24} />}
        </div>
    );
}
