// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

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

/// @title Reputation Core
/// @notice Deterministic reputation calculation engine
/// @dev Calculates reputation based on wins, participation, and arena points
contract ReputationCore is Ownable {
    /// @notice Constants for reputation calculation
    uint256 public constant REPUTATION_PER_WIN = 50;
    uint256 public constant REPUTATION_PER_PARTICIPATION = 5;
    uint256 public constant REPUTATION_ARENA_DIVISOR = 10;

    /// @notice Reference to Somnia Passport contract
    ISomniaPassport public passportContract;

    /// @notice Event emitted when reputation is updated
    event ReputationUpdated(address indexed user, uint256 newReputation);

    /// @notice Constructor initializing the contract
    /// @param _passportContract Address of the SomniaPassport contract
    constructor(address _passportContract) {
        require(_passportContract != address(0), "Invalid passport contract");
        passportContract = ISomniaPassport(_passportContract);
    }

    /// @notice Calculate reputation using deterministic formula
    /// @dev Formula: (wins * 50) + (participation * 5) + (arenaPoints / 10)
    /// @param wins Number of wins
    /// @param participation Number of participations
    /// @param arenaPoints Total arena points
    /// @return Calculated reputation value
    function calculateReputation(
        uint256 wins,
        uint256 participation,
        uint256 arenaPoints
    ) public pure returns (uint256) {
        uint256 reputationFromWins = wins * REPUTATION_PER_WIN;
        uint256 reputationFromParticipation = participation * REPUTATION_PER_PARTICIPATION;
        uint256 reputationFromArena = arenaPoints / REPUTATION_ARENA_DIVISOR;

        return reputationFromWins + reputationFromParticipation + reputationFromArena;
    }

    /// @notice Update reputation for a user based on their current stats
    /// @dev Calls passport contract to update stats
    /// @param user Address of user to update reputation for
    function updateReputation(address user) external onlyOwner {
        require(user != address(0), "Invalid address");
        require(passportContract.passportOf(user) != 0, "Passport not minted");

        (
            uint256 currentReputation,
            uint256 arenaPoints,
            uint256 wins,
            uint256 participation,
            ,

        ) = passportContract.getPassport(user);

        uint256 newReputation = calculateReputation(wins, participation, arenaPoints);

        if (newReputation != currentReputation) {
            passportContract.updateStats(user, newReputation, arenaPoints, wins, participation);
            emit ReputationUpdated(user, newReputation);
        }
    }

    /// @notice Update reputation formula constants (future extension)
    /// @dev Only owner can update
    /// @param _passportContract New passport contract address
    function updatePassportContract(address _passportContract) external onlyOwner {
        require(_passportContract != address(0), "Invalid passport contract");
        passportContract = ISomniaPassport(_passportContract);
    }

    /// @notice Get reputation calculation explanation
    /// @return explanation String describing the formula
    function getReputationFormula() external pure returns (string memory) {
        return "reputation = (wins * 50) + (participation * 5) + (arenaPoints / 10)";
    }
}
