import { USDT, USDC } from '@/assets/svg/token'
import COVER from '@/assets/svg/token/COVER.png'
import { ethers } from 'ethers'
import { Token, Pool } from './makePool'

var tokenList = {},
  pools = []

const poolConfig = {
  network: 'homestead',
  chainid: 1,
  infuraid: '9180c5a422ac44f9b21ad7927b6b662c',
  collar: '0x11facD2B150caDD5322AeB62219cBF9A3cF8Da79',
  browser: 'https://etherscan.io',
  gasAdjustment: 150,
  factory: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
  pricePool: '0x5BBBE4Da8b5AF36482F75747Ee38ddFDf3F6e4D9',
  stablecoin: '0x08f5F253fb2080660e9a4E3882Ef4458daCd52b0',
}

tokenList = {
  ...Token('SWAP', poolConfig.pricePool),
  ...Token('COLLAR', poolConfig.collar),
  ...Token('COVER', '0x4688a8b1F292FDaB17E9a90c8Bc379dC1DBd8713', COVER),
}

pools = [
  Pool(
    {
      bond: '0x4688a8b1F292FDaB17E9a90c8Bc379dC1DBd8713',
      want: '0x11facD2B150caDD5322AeB62219cBF9A3cF8Da79',
      r1: {
        addr: '0x4663E439F07429a43CeCAe28523d7e51ad0bDebE',
        coll: '0xC5fb11512E724941b8Ed28966459Ac8e9332507E',
        call: '0xc8f6E9E7E3b106Bcc5f8c1Cf8Ab3dBC1D0a256c4',
        expiry_time: 1696118400,
      },
    },
    tokenList,
  ),
]

export { tokenList, pools, poolConfig }
