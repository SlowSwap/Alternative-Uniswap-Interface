import React, { useState, useEffect } from 'react'
import { getDecimals } from '../ethereumFunctions';
import { Contract, ethers } from 'ethers';
import { CoinDef } from 'constants/coins';

const TestERC20 = require("../build/TestERC20.json");

export default function TestToken(props) {
    const [loading, setLoading] = useState(false)
    const [coins, setCoins] = useState<CoinDef[]>([])
    const [showMintButtons, setShowMintButtons] = useState<boolean>(false)

    const { network } = props;
    useEffect(() => {
        let coins = network.coins || []
        const testCoins = coins.filter(coin => coin.abbr.includes("TEST"))
        setCoins(testCoins)

    }, [network.coins, network.chainID])

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
            {showMintButtons ? (
                <div className="my-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-slate-50 bg-opacity-50 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <div className="flex justify-center items-center mb-4 text-gray-700">
                            <div className="text-xl">Mint + approve test tokens</div>
                        </div>
                        <div className="flex justify-center items-center gap-4">
                            {coins.map(coin =>
                                <button
                                    className={"inline-flex items-center px-3 py-2 bg-purple-500 hover:bg-purple-600 rounded-md shadow-sm text-bold text-white " + (loading ? " disabled" : "")}
                                    key={coin.address}
                                    onClick={() => mintTestToken(coin.address)}
                                >
                                    <div>{coin.abbr}</div>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

            ) : (
                <div className="flex justify-center mt-8">
                    <button
                        className="bg-purple-300 hover:bg-purple-400 bg-opacity-40 rounded-lg text-gray-300 py-2 px-4"
                        onClick={() => setShowMintButtons(true)}
                    >mint test tokens</button>
                </div>
            )}
        </div>
    );
}
