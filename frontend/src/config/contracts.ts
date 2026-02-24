export const SOMNIA_PASSPORT_ABI = [
  {
    inputs: [],
    name: 'mintPassport',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
    name: 'getPassport',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'reputation', type: 'uint256' },
          { internalType: 'uint256', name: 'arenaPoints', type: 'uint256' },
          { internalType: 'uint256', name: 'wins', type: 'uint256' },
          { internalType: 'uint256', name: 'participation', type: 'uint256' },
          { internalType: 'uint256', name: 'createdAt', type: 'uint256' },
          { internalType: 'uint256', name: 'lastUpdated', type: 'uint256' },
        ],
        internalType: 'struct SomniaPassport.PassportData',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'passportOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
];

export const ARENA_ENGINE_ABI = [
  {
    inputs: [
      { internalType: 'uint256', name: 'entryFee', type: 'uint256' },
      { internalType: 'uint256', name: 'duration', type: 'uint256' },
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
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'challengeId', type: 'uint256' },
      { internalType: 'uint256', name: 'score', type: 'uint256' },
    ],
    name: 'submitScore',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'challengeId', type: 'uint256' }],
    name: 'finalizeChallenge',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'challengeId', type: 'uint256' }],
    name: 'getChallenge',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'id', type: 'uint256' },
          { internalType: 'address', name: 'creator', type: 'address' },
          { internalType: 'uint256', name: 'entryFee', type: 'uint256' },
          { internalType: 'uint256', name: 'duration', type: 'uint256' },
          { internalType: 'uint256', name: 'startTime', type: 'uint256' },
          { internalType: 'uint256', name: 'totalPrize', type: 'uint256' },
          { internalType: 'bool', name: 'finalized', type: 'bool' },
          { internalType: 'address', name: 'topPlayer', type: 'address' },
          { internalType: 'uint256', name: 'topScore', type: 'uint256' },
        ],
        internalType: 'struct ArenaEngine.Challenge',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'pendingWithdrawals',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'challengeId', type: 'uint256' }],
    name: 'getParticipantCount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'challengeId', type: 'uint256' }],
    name: 'getParticipants',
    outputs: [{ internalType: 'address[]', name: '', type: 'address[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'challengeId', type: 'uint256' }],
    name: 'getLeaderboard',
    outputs: [
      { internalType: 'address[]', name: 'addresses', type: 'address[]' },
      { internalType: 'uint256[]', name: 'scores_', type: 'uint256[]' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'challengeId', type: 'uint256' },
      { internalType: 'address', name: 'participant', type: 'address' },
    ],
    name: 'calculateRank',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getChallengeIdCounter',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
];

export const REPUTATION_CORE_ABI = [
  {
    inputs: [
      { internalType: 'uint256', name: 'wins', type: 'uint256' },
      { internalType: 'uint256', name: 'participation', type: 'uint256' },
      { internalType: 'uint256', name: 'arenaPoints', type: 'uint256' },
    ],
    name: 'calculateReputation',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
    name: 'updateReputation',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getReputationFormula',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'pure',
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
