// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

interface ISomniaPassport {
    function updateStats(
        address user,
        uint256 newReputation,
        uint256 newArenaPoints,
        uint256 newWins,
        uint256 newParticipation
    ) external;

    function getPassport(address user) external view returns (
        uint256 reputation,
        uint256 arenaPoints,
        uint256 wins,
        uint256 participation,
        uint256 createdAt,
        uint256 lastUpdated
    );

    function passportOf(address user) external view returns (uint256);
}

/// @title Arena Engine
/// @notice On-chain challenge and leaderboard management system
/// @dev Manages challenges, scoring, and prize distribution
contract ArenaEngine is Ownable, ReentrancyGuard {
    /// @notice Challenge data structure
    struct Challenge {
        uint256 id;
        address creator;
        uint256 entryFee;
        uint256 duration;
        uint256 startTime;
        uint256 totalPrize;
        bool finalized;
        address topPlayer;
        uint256 topScore;
    }

    /// @notice Mapping from challenge ID to challenge data
    mapping(uint256 => Challenge) public challenges;

    /// @notice Mapping from challenge ID to participant scores
    mapping(uint256 => mapping(address => uint256)) public scores;

    /// @notice Mapping from challenge ID to participants list
    mapping(uint256 => address[]) public participants;

    /// @notice Mapping from challenge ID to participant index (for quick lookup)
    mapping(uint256 => mapping(address => uint256)) public participantIndex;

    /// @notice Mapping to track if address has entered a challenge
    mapping(uint256 => mapping(address => bool)) public hasEntered;

    /// @notice Challenge ID counter
    uint256 private challengeIdCounter;

    /// @notice Reference to Somnia Passport contract
    ISomniaPassport public passportContract;

    /// @notice Pending withdrawals (pull payment model)
    mapping(address => uint256) public pendingWithdrawals;

    /// @notice Event emitted when a challenge is created
    event ChallengeCreated(
        uint256 indexed challengeId,
        address indexed creator,
        uint256 entryFee,
        uint256 duration
    );

    /// @notice Event emitted when a participant enters a challenge
    event ParticipantEntered(uint256 indexed challengeId, address indexed participant);

    /// @notice Event emitted when a score is submitted
    event ScoreSubmitted(
        uint256 indexed challengeId,
        address indexed participant,
        uint256 score,
        uint256 rank
    );

    /// @notice Event emitted when a challenge is finalized
    event ChallengeFinalized(
        uint256 indexed challengeId,
        address indexed winner,
        uint256 winPool
    );

    /// @notice Event emitted when prize is withdrawn
    event WithdrawalProcessed(address indexed recipient, uint256 amount);

    /// @notice Constructor initializing the contract
    /// @param _passportContract Address of the SomniaPassport contract
    constructor(address _passportContract) {
        require(_passportContract != address(0), "Invalid passport contract");
        passportContract = ISomniaPassport(_passportContract);
        challengeIdCounter = 1;
    }

    /// @notice Create a new challenge
    /// @param entryFee Entry fee in wei
    /// @param duration Challenge duration in seconds
    /// @return challengeId ID of the created challenge
    function createChallenge(uint256 entryFee, uint256 duration) external returns (uint256) {
        require(passportContract.passportOf(msg.sender) != 0, "Must mint passport first");
        require(entryFee > 0, "Entry fee must be greater than 0");
        require(duration >= 3600 && duration <= 30 days, "Duration must be between 1 hour and 30 days");

        uint256 challengeId = challengeIdCounter;
        challengeIdCounter += 1;

        Challenge storage challenge = challenges[challengeId];
        challenge.id = challengeId;
        challenge.creator = msg.sender;
        challenge.entryFee = entryFee;
        challenge.duration = duration;
        challenge.startTime = block.timestamp;
        challenge.totalPrize = 0;
        challenge.finalized = false;
        challenge.topPlayer = address(0);
        challenge.topScore = 0;

        emit ChallengeCreated(challengeId, msg.sender, entryFee, duration);

        return challengeId;
    }

    /// @notice Enter a challenge by paying the entry fee
    /// @param challengeId Challenge ID to enter
    function enterChallenge(uint256 challengeId) external payable nonReentrant {
        Challenge storage challenge = challenges[challengeId];
        require(challenge.id != 0, "Challenge does not exist");
        require(msg.value == challenge.entryFee, "Incorrect entry fee");
        require(!challenge.finalized, "Challenge is finalized");
        require(block.timestamp < challenge.startTime + challenge.duration, "Challenge expired");
        require(passportContract.passportOf(msg.sender) != 0, "Must mint passport first");
        require(!hasEntered[challengeId][msg.sender], "Already entered challenge");

        challenge.totalPrize += msg.value;

        uint256 participantCount = participants[challengeId].length;
        participantIndex[challengeId][msg.sender] = participantCount;
        participants[challengeId].push(msg.sender);

        scores[challengeId][msg.sender] = 0;
        hasEntered[challengeId][msg.sender] = true;

        emit ParticipantEntered(challengeId, msg.sender);
    }

    /// @notice Submit a score for the challenge
    /// @dev Score can only be increased, not decreased
    /// @param challengeId Challenge ID
    /// @param score New score
    function submitScore(uint256 challengeId, uint256 score) external nonReentrant {
        Challenge storage challenge = challenges[challengeId];
        require(challenge.id != 0, "Challenge does not exist");
        require(!challenge.finalized, "Challenge is finalized");
        require(block.timestamp < challenge.startTime + challenge.duration, "Challenge expired");
        require(score > 0, "Score must be greater than zero");
        require(hasEntered[challengeId][msg.sender], "Not participated in challenge");

        uint256 currentScore = scores[challengeId][msg.sender];
        require(score > currentScore, "Score can only increase");

        scores[challengeId][msg.sender] = score;

        // Update top player
        if (score > challenge.topScore) {
            challenge.topScore = score;
            challenge.topPlayer = msg.sender;
        }

        uint256 rank = calculateRank(challengeId, msg.sender);

        emit ScoreSubmitted(challengeId, msg.sender, score, rank);
    }

    /// @notice Calculate participant rank in challenge
    /// @param challengeId Challenge ID
    /// @param participant Address of participant
    /// @return rank Current rank
    function calculateRank(uint256 challengeId, address participant) public view returns (uint256) {
        uint256 participantScore = scores[challengeId][participant];
        require(participantScore > 0, "Participant not in challenge");

        uint256 rank = 1;
        address[] memory participantsList = participants[challengeId];

        for (uint256 i = 0; i < participantsList.length; i++) {
            if (scores[challengeId][participantsList[i]] > participantScore) {
                rank += 1;
            }
        }

        return rank;
    }

    /// @notice Finalize challenge and distribute rewards
    /// @param challengeId Challenge ID to finalize
    function finalizeChallenge(uint256 challengeId) external nonReentrant {
        Challenge storage challenge = challenges[challengeId];
        require(challenge.id != 0, "Challenge does not exist");
        require(!challenge.finalized, "Challenge already finalized");
        require(msg.sender == challenge.creator || msg.sender == owner(), "Only creator or owner can finalize");
        require(block.timestamp >= challenge.startTime + challenge.duration, "Challenge still active");

        challenge.finalized = true;

        // Distribute rewards to winner
        if (challenge.topPlayer != address(0)) {
            uint256 participantCount = participants[challengeId].length;

            if (participantCount == 1) {
                // Single participant gets full prize pool
                pendingWithdrawals[challenge.topPlayer] += challenge.totalPrize;
                emit ChallengeFinalized(challengeId, challenge.topPlayer, challenge.totalPrize);
            } else {
                // Multiple participants: 70% to winner, 30% to others
                uint256 winPool = (challenge.totalPrize * 70) / 100;
                uint256 refundPool = challenge.totalPrize - winPool;

                pendingWithdrawals[challenge.topPlayer] += winPool;

                // Distribute refund among non-winners
                uint256 refundPerParticipant = refundPool / (participantCount - 1);

                for (uint256 i = 0; i < participantCount; i++) {
                    address participant = participants[challengeId][i];
                    if (participant != challenge.topPlayer) {
                        pendingWithdrawals[participant] += refundPerParticipant;
                    }
                }

                emit ChallengeFinalized(challengeId, challenge.topPlayer, winPool);
            }
        }
    }

    /// @notice Withdrawal function using pull payment model
    function withdraw() external nonReentrant {
        uint256 amount = pendingWithdrawals[msg.sender];
        require(amount > 0, "No pending withdrawals");

        pendingWithdrawals[msg.sender] = 0;

        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Withdrawal failed");

        emit WithdrawalProcessed(msg.sender, amount);
    }

    /// @notice Get challenge details
    /// @param challengeId Challenge ID
    /// @return Challenge struct
    function getChallenge(uint256 challengeId) external view returns (Challenge memory) {
        return challenges[challengeId];
    }

    /// @notice Get participant count for a challenge
    /// @param challengeId Challenge ID
    /// @return Number of participants
    function getParticipantCount(uint256 challengeId) external view returns (uint256) {
        return participants[challengeId].length;
    }

    /// @notice Get all participants for a challenge
    /// @param challengeId Challenge ID
    /// @return Array of participant addresses
    function getParticipants(uint256 challengeId) external view returns (address[] memory) {
        return participants[challengeId];
    }

    /// @notice Get leaderboard for a challenge
    /// @param challengeId Challenge ID
    /// @return addresses Array of addresses sorted by score
    /// @return scores_ Array of scores in descending order
    function getLeaderboard(uint256 challengeId)
        external
        view
        returns (address[] memory addresses, uint256[] memory scores_)
    {
        address[] memory participantsList = participants[challengeId];
        uint256 length = participantsList.length;

        addresses = new address[](length);
        scores_ = new uint256[](length);

        // Copy data
        for (uint256 i = 0; i < length; i++) {
            addresses[i] = participantsList[i];
            scores_[i] = scores[challengeId][participantsList[i]];
        }

        // Simple bubble sort in descending order
        for (uint256 i = 0; i < length; i++) {
            for (uint256 j = i + 1; j < length; j++) {
                if (scores_[j] > scores_[i]) {
                    // Swap addresses
                    address tempAddr = addresses[i];
                    addresses[i] = addresses[j];
                    addresses[j] = tempAddr;

                    // Swap scores
                    uint256 tempScore = scores_[i];
                    scores_[i] = scores_[j];
                    scores_[j] = tempScore;
                }
            }
        }

        return (addresses, scores_);
    }

    /// @notice Get current challenge ID counter
    /// @return Current ID counter value
    function getChallengeIdCounter() external view returns (uint256) {
        return challengeIdCounter;
    }
}
