const abi = [
  'function sx() external view returns (uint256)',
  'function sy() external view returns (uint256)',
  'function sk() external view returns (uint256)',
  'function swap_sqp() external view returns (uint256)',
  'function calc_k(uint256,uint256) external view returns (uint256)',
  'function get_dx(uint256) external view returns (uint256)',
  'function get_dy(uint256) external view returns (uint256)',
  'function get_dk(uint256, uint256) external view returns (uint256)',
  'function earned(address) external view returns (uint256)',
  'function get_dxdy(uint256) external view returns (uint256, uint256)',
  'function borrow_want(uint256, uint256) external',
  'function burn_call(uint256) external',
  'function burn_dual(uint256) external',
  'function repay_both(uint256, uint256) external',
  'function mint(uint256, uint256, uint256) external',
  'function withdraw_both(uint256) external',
  'function swap_coll_to_min_want(uint256, uint256) external',
  'function swap_want_to_min_coll(uint256, uint256) external',
  'function claim_reward() external',
  'function swap_fee() public pure returns (uint256)',
  'function burn_and_claim(uint256) public',
  'function mint_dual(uint256) public',
  'function balanceOf(address) external view returns (uint256)',
  'function totalSupply() public view returns (uint256)',
  'function reward_rate() public view returns (uint256)',
  'function getPool(address,address,uint24) external view returns (address)',
  'function slot0() external view returns (uint160,int24,uint16,uint16,uint16,uint8,bool)',
  'function transfer(address, uint256) external',
  'function approve(address, uint256) external',
  'function allowance(address, address) external view returns (uint256)',
]

const abiCoder = {
  sx: ['uint256'],
  sy: ['uint256'],
  sk: ['uint256'],
  swap_sqp: ['uint256'],
  calc_k: ['uint256'],
  get_dx: ['uint256'],
  get_dy: ['uint256'],
  get_dk: ['uint256'],
  earned: ['uint256'],
  swap_fee: ['uint256'],
  balanceOf: ['uint256'],
  totalSupply: ['uint256'],
  reward_rate: ['uint256'],
  allowance: ['uint256'],
  getPool: ['address'],
  get_dxdy: ['uint256', 'uint256'],
  slot0: ['uint160', 'int24', 'uint16', 'uint16', 'uint16', 'uint8', 'bool'],
}

export { abi, abiCoder }