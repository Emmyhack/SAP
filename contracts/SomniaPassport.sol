// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/// @title Somnia Passport
/// @notice ERC721 Soulbound Token for Somnia Arena Passport system
/// @dev Non-transferable passport token with on-chain metadata and SVG generation
contract SomniaPassport is ERC721, Ownable, ReentrancyGuard {
    using Strings for uint256;
    using Strings for address;

    /// @notice Passport data structure
    struct PassportData {
        uint256 reputation;
        uint256 arenaPoints;
        uint256 wins;
        uint256 participation;
        uint256 createdAt;
        uint256 lastUpdated;
    }

    /// @notice Mapping from address to token ID
    mapping(address => uint256) public passportOf;

    /// @notice Mapping from token ID to passport data
    mapping(uint256 => PassportData) public passportData;

    /// @notice Current token ID counter
    uint256 private tokenIdCounter;

    /// @notice Event emitted when a passport is minted
    event PassportMinted(address indexed user, uint256 indexed tokenId);

    /// @notice Event emitted when passport stats are updated
    event PassportUpdated(
        address indexed user,
        uint256 newReputation,
        uint256 newArenaPoints,
        uint256 newWins,
        uint256 newParticipation
    );

    /// @notice Constructor initializing the ERC721 with name and symbol
    constructor() ERC721("Somnia Passport", "SMNP") {
        tokenIdCounter = 1;
    }

    /// @notice Mint a new passport for the caller
    /// @dev Only one passport per address, reverts if already minted
    function mintPassport() external nonReentrant {
        require(msg.sender != address(0), "Invalid address");
        require(passportOf[msg.sender] == 0, "Passport already minted");

        uint256 tokenId = tokenIdCounter;
        tokenIdCounter += 1;

        passportOf[msg.sender] = tokenId;

        PassportData storage data = passportData[tokenId];
        data.reputation = 0;
        data.arenaPoints = 0;
        data.wins = 0;
        data.participation = 0;
        data.createdAt = block.timestamp;
        data.lastUpdated = block.timestamp;

        _safeMint(msg.sender, tokenId);

        emit PassportMinted(msg.sender, tokenId);
    }

    /// @notice Update passport statistics
    /// @dev Called by authorized contracts (Arena Engine, etc.)
    /// @param user Address of the passport owner
    /// @param newReputation Updated reputation value
    /// @param newArenaPoints Updated arena points
    /// @param newWins Updated win count
    /// @param newParticipation Updated participation count
    function updateStats(
        address user,
        uint256 newReputation,
        uint256 newArenaPoints,
        uint256 newWins,
        uint256 newParticipation
    ) external onlyOwner nonReentrant {
        require(user != address(0), "Invalid address");

        uint256 tokenId = passportOf[user];
        require(tokenId != 0, "Passport not minted");

        PassportData storage data = passportData[tokenId];
        data.reputation = newReputation;
        data.arenaPoints = newArenaPoints;
        data.wins = newWins;
        data.participation = newParticipation;
        data.lastUpdated = block.timestamp;

        emit PassportUpdated(user, newReputation, newArenaPoints, newWins, newParticipation);
    }

    /// @notice Get passport data for an address
    /// @param user Address to query
    /// @return PassportData struct containing all passport information
    function getPassport(address user) external view returns (PassportData memory) {
        uint256 tokenId = passportOf[user];
        require(tokenId != 0, "Passport not minted");
        return passportData[tokenId];
    }

    /// @notice Generate on-chain SVG image for passport
    /// @param tokenId Token ID to generate SVG for
    /// @return SVG string as bytes
    function generateSVG(uint256 tokenId) internal view returns (bytes memory) {
        PassportData memory data = passportData[tokenId];

        string memory svg = string(
            abi.encodePacked(
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500">',
                '<defs>',
                '<style>',
                'text { font-family: Inter, sans-serif; }',
                '.title { font-size: 24px; font-weight: 600; fill: #E6EDF3; }',
                '.label { font-size: 12px; font-weight: 400; fill: #8B949E; }',
                '.value { font-size: 18px; font-weight: 600; fill: #2F81F7; }',
                '.border { stroke: #1F2933; stroke-width: 2; fill: none; }',
                '</style>',
                '</defs>',
                '<rect width="400" height="500" fill="#0B0F14" class="border" />',
                '<rect x="20" y="20" width="360" height="460" fill="none" class="border" stroke="#1F2933" stroke-width="1" />',
                '<text x="200" y="60" class="title" text-anchor="middle">SOMNIA PASSPORT</text>',
                '<text x="20" y="120" class="label">ID</text>',
                '<text x="20" y="145" class="value">#',
                tokenId.toString(),
                '</text>',
                '<line x1="20" y1="160" x2="380" y2="160" stroke="#1F2933" stroke-width="1" />',
                '<text x="20" y="200" class="label">REPUTATION</text>',
                '<text x="20" y="225" class="value">',
                data.reputation.toString(),
                '</text>',
                '<text x="220" y="200" class="label">ARENA POINTS</text>',
                '<text x="220" y="225" class="value">',
                data.arenaPoints.toString(),
                '</text>',
                '<line x1="20" y1="240" x2="380" y2="240" stroke="#1F2933" stroke-width="1" />',
                '<text x="20" y="280" class="label">WINS</text>',
                '<text x="20" y="305" class="value">',
                data.wins.toString(),
                '</text>',
                '<text x="220" y="280" class="label">PARTICIPATION</text>',
                '<text x="220" y="305" class="value">',
                data.participation.toString(),
                '</text>',
                '<line x1="20" y1="320" x2="380" y2="320" stroke="#1F2933" stroke-width="1" />',
                '<text x="20" y="360" class="label">HOLDER</text>',
                '<text x="20" y="383" class="value" font-size="11px">',
                ownerOf(tokenId).toHexString(),
                '</text>',
                '<text x="20" y="450" class="label">LAST UPDATED: ',
                block.timestamp.toString(),
                '</text>',
                '</svg>'
            )
        );

        return bytes(svg);
    }

    /// @notice Get tokenURI with base64 encoded JSON metadata
    /// @param tokenId Token ID to get URI for
    /// @return Base64 encoded data URI
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "Token does not exist");

        PassportData memory data = passportData[tokenId];
        bytes memory svg = generateSVG(tokenId);

        string memory json = string(
            abi.encodePacked(
                '{"name":"Somnia Passport #',
                tokenId.toString(),
                '","description":"Official Somnia Arena Passport Token","image":"data:image/svg+xml;base64,',
                Base64.encode(svg),
                '","attributes":[',
                '{"trait_type":"Reputation","value":',
                data.reputation.toString(),
                '},',
                '{"trait_type":"Arena Points","value":',
                data.arenaPoints.toString(),
                '},',
                '{"trait_type":"Wins","value":',
                data.wins.toString(),
                '},',
                '{"trait_type":"Participation","value":',
                data.participation.toString(),
                '}',
                ']}'
            )
        );

        return string(abi.encodePacked("data:application/json;base64,", Base64.encode(bytes(json))));
    }

    /// @notice Check if token exists
    /// @param tokenId Token ID to check
    /// @return True if token exists
    function _exists(uint256 tokenId) internal view override returns (bool) {
        // Check if the passport was created by seeing if it's mapped to an owner
        try this.ownerOf(tokenId) returns (address) {
            return true;
        } catch {
            return false;
        }
    }

    /// @notice Override transfer functions to prevent transfers (soulbound)
    function transferFrom(address, address, uint256) public pure override {
        revert("Passport is soulbound and cannot be transferred");
    }

    /// @notice Override safe transfer functions to prevent transfers (soulbound)
    function safeTransferFrom(address, address, uint256) public pure override {
        revert("Passport is soulbound and cannot be transferred");
    }

    /// @notice Override safe transfer functions to prevent transfers (soulbound)
    function approve(address, uint256) public pure override {
        revert("Passport is soulbound and cannot be transferred");
    }

    /// @notice Override setApprovalForAll to prevent approval (soulbound)
    function setApprovalForAll(address, bool) public pure override {
        revert("Passport is soulbound and cannot be transferred");
    }
}
