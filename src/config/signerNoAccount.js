import { ethers } from 'ethers'

// const ROPSTEN = 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
const ROPSTEN = 'https://eth-ropsten.alchemyapi.io/v2/yv9AMwDtWom9CxzvGRZCMkK9CFJCR4zL'
const KOVAN = 'https://kovan.infura.io'
const MAINNET = 'https://mainnet.infura.io/v3/9180c5a422ac44f9b21ad7927b6b662c'

var signer = null
switch (window.location.host) {
  case 'yzkonchain.github.io':
  case 'localhost':
    signer = new ethers.providers.JsonRpcProvider(ROPSTEN, 'ropsten')
    break
  default:
    signer = new ethers.providers.JsonRpcProvider(MAINNET, 'homestead')
    break
}

export default signer
