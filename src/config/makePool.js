import { ethers } from 'ethers'
import { abi } from '@/config/abi'
import signerNoAccount from '@/config/signerNoAccount'
import { CALL } from '@/assets/svg/token'
import COLLAR from '@/assets/svg/token/COLLAR.png'
import COLL from '@/assets/svg/token/COLL.png'

const Token = (symbol, addr, icon, decimals) => {
  const token = { symbol, addr, decimals: 18, ct: new ethers.Contract(addr, abi, signerNoAccount) }
  switch (symbol) {
    case 'COLLAR':
    case 'CLPT':
      token.icon = COLLAR
      break
    case 'COLL':
      token.icon = COLL
      break
    case 'CALL':
      token.icon = CALL
      break
    default:
      token.icon = icon || COLLAR
      token.decimals = decimals || 18
      break
  }
  return { [addr]: token }
}

const Pool = ({ bond, want, r1, r2 }, list) => {
  const r = [r1, r2].map((pool) => {
    if (pool) {
      const { addr, coll, call, expiry_time, symbol } = pool
      const ct = new ethers.Contract(addr, abi, signerNoAccount)
      list[addr] = Token('CLPT', addr)[addr]
      list[coll] = Token('COLL', coll)[coll]
      list[call] = Token('CALL', call)[call]
      return {
        addr,
        expiry_time,
        bond: list[bond],
        want: list[want],
        coll: list[coll],
        call: list[call],
        symbol: symbol || 'CLPT',
        icon: COLLAR,
        ct,
      }
    } else return null
  })
  return { r1: r[0], r2: r[1] }
}

export { Token, Pool }
