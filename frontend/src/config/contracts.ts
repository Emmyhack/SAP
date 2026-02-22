export const SOMNIA_PASSPORT_ABI = [
  {
    inputs: [],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'hasPassport',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
];

export const ARENA_ENGINE_ABI = [
  {
    inputs: [
      { internalType: 'string', name: '_title', type: 'string' },
      { internalType: 'uint256', name: '_difficulty', type: 'uint256' },
      { internalType: 'uint32', name: '_reward', type: 'uint32' },
      { internalType: 'uint32', name: '_timeLimit', type: 'uint32' },
    ],
    name: 'createChallenge',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'challengeId', type: 'uint256' }],
    name: 'enterChallenge',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'challengeId', type: 'uint256' },
      { internalType: 'address', name: 'participant', type: 'address' },
      { internalType: 'uint32', name: 'score', type: 'uint32' },
    ],
    name: 'submitScore',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'challengeId', type: 'uint256' }],
    name: 'getChallenge',
    outputs: [
      { internalType: 'string', name: 'title', type: 'string' },
      { internalType: 'uint256', name: 'difficulty', type: 'uint256' },
      { internalType: 'uint32', name: 'reward', type: 'uint32' },
      { internalType: 'uint32', name: 'timeLimit', type: 'uint32' },
      { internalType: 'address', name: 'creator', type: 'address' },
      { internalType: 'bool', name: 'isActive', type: 'bool' },
      { internalType: 'uint32', name: 'participantCount', type: 'uint32' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'challengeCount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
];

export const REPUTATION_CORE_ABI = [
  {
    inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
    name: 'getReputation',
    outputs: [
      { internalType: 'uint32', name: 'score', type: 'uint32' },
      { internalType: 'uint32', name: 'arenaPoints', type: 'uint32' },
      { internalType: 'uint32', name: 'wins', type: 'uint32' },
      { internalType: 'uint32', name: 'participation', type: 'uint32' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
    name: 'getRank',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'user', type: 'address' },
      { internalType: 'uint32', name: 'points', type: 'uint32' },
    ],
    name: 'addArenaPoints',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getTopUsers',
    outputs: [
      { internalType: 'address[]', name: '', type: 'address[]' },
      { internalType: 'uint32[]', name: '', type: 'uint32[]' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

export const contracts = {
  SomniaPassport: {
    address: '0x4EA2810Ac8940336Ca3622Ce8363f61D87444dD6',
    abi: SOMNIA_PASSPORT_ABI,
  },
  ArenaEngine: {
    address: '0x871Ba70245D1f25BDA5eB394C56A05d576c83875',
    abi: ARENA_ENGINE_ABI,
  },
  ReputationCore: {
    address: '0x301f106a714cD1b5524D9F9EEa6241fE4BBF14d0',
    abi: REPUTATION_CORE_ABI,
  },
};
