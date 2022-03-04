import * as chains from './chains';

export type CoinDef = {
  name: string
  abbr: string
  address: string
}

// If you add coins for a new network, make sure Weth address (for the router you are using) is the first entry

const AUTONITYCoins: CoinDef[] = [
  {
    name: "Auton",
    abbr: "AUT",
    address: "", // Weth address is fetched from the router
  },
  {
    name: "Newton",
    abbr: "NEW",
    address: "0xBd770416a3345F91E4B34576cb804a576fa48EB1",
  },
  {
    name: "Token A",
    abbr: "TA",
    address: "0xD5073808CbA7d24500aa8f659B339b87945958a6",
  },
  {
    name: "Token B",
    abbr: "TB",
    address: "0x908B8e60d149529d757F4aEd9320F246724f2b99",
  },
  {
    name: "Token C",
    abbr: "TC",
    address: "0x03c7D835CceE5d741b3f3D144eBfC5327925ECf9",
  },
  {
    name: "Token D",
    abbr: "TD",
    address: "0x90636A8bb3AD4C2168EE20CF5E6183D827Da2E91",
  }
]

const DEVNETCoins: CoinDef[] = [
  {
    name: "Auton",
    abbr: "AUT",
    address: "", // Weth address is fetched from the router
  },
  {
    name: "Newton",
    abbr: "NEW",
    address: "0xBd770416a3345F91E4B34576cb804a576fa48EB1",
  },
  {
    name: "Token A",
    abbr: "TA",
    address: "0xD5073808CbA7d24500aa8f659B339b87945958a6",
  },
  {
    name: "Token B",
    abbr: "TB",
    address: "0x908B8e60d149529d757F4aEd9320F246724f2b99",
  }
]

const PARASTATECoins: CoinDef[] = [
  {
    name: "Ether",
    abbr: "ETH",
    address: "", // Weth address is fetched from the router
  },
  {
    name: "Token A",
    abbr: "TA",
    address: "0x4EDFE8706Cefab9DCd52630adFFd00E9b93FF116",
  },
  {
    name: "Token B",
    abbr: "TB",
    address: "0x4489D87C8440B19f11d63FA2246f943F492F3F5F",
  },

  {
    name: "Token C",
    abbr: "TC",
    address: "0x1d29BD2ACedBff15A59e946a4DE26d5257447727",
  },
  {
    name: "Token D",
    abbr: "TD",
    address: "0xc108a13D00371520EbBeCc7DF5C8610C71F4FfbA",
  }
]

const GANACHECoins: CoinDef[] = [
  {
    name: "Ether",
    abbr: "ETH",
    address: "", // Weth address is fetched from the router
  },
  {
    name: "Token A",
    abbr: "TA",
    address: "0xE8C4BE1Bd495c984dD83B683966B7B538d3Ea82C",
  },
  {
    name: "Token B",
    abbr: "TB",
    address: "0x30988e63329713c3f3FeA1ca1B94D4Abb02F78C5",
  },

  {
    name: "Token C",
    abbr: "TC",
    address: "0x23b4ce07ef4e2378319E40CbC0cc95EAbCf8E419",
  },
  {
    name: "Token D",
    abbr: "TD",
    address: "0x49Ec3915F4daB907f7C6F74Cf5110366FCCc81A5",
  }
]

const MAINNETCoins: CoinDef[] = [
  {
    name: "Ether",
    abbr: "ETH",
    address: "", // Weth address is fetched from the router
  },
  {
    name: "Dai",
    abbr: "DAI",
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  },
  {
    name: "Tether USD",
    abbr: "USDT",
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  },
]

const ROPSTENCoins: CoinDef[] = [
  {
    name: "Ether",
    abbr: "ETH",
    address: "", // Weth address is fetched from the router
  },
  {
    name: "Dai",
    abbr: "DAI",
    address: "0xad6d458402f60fd3bd25163575031acdce07538d",
  },
  {
    name: "Tether USD",
    abbr: "USDT",
    address: "0x6ee856ae55b6e1a249f04cd3b947141bc146273c",
  },
  {
    name: "Token 0",
    abbr: "TEST0",
    address: "0xc34375f07a56fb8887600E4cd04d8C245a4D6bc2",
  },
  {
    name: "Token 1",
    abbr: "TEST1",
    address: "0xB79C345353eCc0edC1B60cf474CE552D7B6F34F2",
  },

  {
    name: "Token 2",
    abbr: "TEST2",
    address: "0x9d664E019a5Fb2C9bc8db7191D25d2B0E9C8608C",
  },

]

const KOVANCoins: CoinDef[] = [
  {
    name: "Ether",
    abbr: "ETH",
    address: "", // // Weth address is fetched from the router
  },
  {
    name: "Dai",
    abbr: "DAI",
    address: "0xc4375b7de8af5a38a93548eb8453a498222c4ff2",
  },
  {
    name: "Tether USD",
    abbr: "USDT",
    address: "0xf3e0d7bf58c5d455d31ef1c2d5375904df525105",
  },
]

const RINKEBYCoins: CoinDef[] = [
  {
    name: "Ether",
    abbr: "ETH",
    address: "", // Weth address is fetched from the router
  },
  {
    name: "Dai",
    abbr: "DAI",
    address: "0x95b58a6bff3d14b7db2f5cb5f0ad413dc2940658",
  },
  {
    name: "Tether USD",
    abbr: "USDT",
    address: "0x3b00ef435fa4fcff5c209a37d1f3dcff37c705ad",
  },
]

const GÖRLICoins: CoinDef[] = [
  {
    name: "Ether",
    abbr: "ETH",
    address: "", // Weth address is fetched from the router
  },
  {
    name: "Dai",
    abbr: "DAI",
    address: "0x73967c6a0904aa032c103b4104747e88c566b1a2",
  },
  {
    name: "Tether USD",
    abbr: "USDT",
    address: "0x509ee0d083ddf8ac028f2a56731412edd63223b9",
  },
]
const POLYGONCoins: CoinDef[] = [
  {
    name: "Matic Token",
    abbr: "MATIC",
    address: "", // Weth address is fetched from the router
  },
  // {
  //   name: "Matic",
  //   abbr: "MATIC",
  //   address: "0x0000000000000000000000000000000000001010",
  // },
  {
    name: "Dai",
    abbr: "DAI",
    address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
  },
  {
    name: "Spork DAO (POS)",
    abbr: "SPORK",
    address: "0x9CA6a77C8B38159fd2dA9Bd25bc3E259C33F5E39",
  },
  {
    name: "Token 0",
    abbr: "TEST0",
    address: "0xc50C5CCD4a3aeaE1371666366079151A20f18e9c",
  },
  {
    name: "Token 1",
    abbr: "TEST1",
    address: "0xb9d8E4e9aA4537E1e6057d8f844Fa3a2900d486A",
  },
  {
    name: "Token 2",
    abbr: "TEST2",
    address: "0xD7cF6D417a760B40794e5F4d0fb0C9f1Ca07Df6d",
  },
]

const COINS = new Map<number, CoinDef[]>();
COINS.set(chains.ChainId.MAINNET, MAINNETCoins);
COINS.set(chains.ChainId.ROPSTEN, ROPSTENCoins);
COINS.set(chains.ChainId.RINKEBY, RINKEBYCoins);
COINS.set(chains.ChainId.GÖRLI, GÖRLICoins);
COINS.set(chains.ChainId.KOVAN, KOVANCoins);
COINS.set(chains.ChainId.AUTONITY, AUTONITYCoins);
COINS.set(chains.ChainId.DEVNET, DEVNETCoins);
COINS.set(chains.ChainId.PARASTATE, PARASTATECoins);
COINS.set(chains.ChainId.GANCHE, GANACHECoins);
COINS.set(chains.ChainId.POLYGON, POLYGONCoins);
export default COINS
