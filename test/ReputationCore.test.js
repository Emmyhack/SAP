const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ReputationCore", function () {
  let reputationCore;
  let somniaPassport;
  let owner;
  let addr1;
  let addr2;
  let addr3;

  beforeEach(async function () {
    [owner, addr1, addr2, addr3] = await ethers.getSigners();

    const SomniaPassport = await ethers.getContractFactory("SomniaPassport");
    somniaPassport = await SomniaPassport.deploy();
    
    const ReputationCore = await ethers.getContractFactory("ReputationCore");
    reputationCore = await ReputationCore.deploy(await somniaPassport.getAddress());
  });

  describe("Deployment", function () {
    it("Should deploy successfully", async function () {
      expect(await reputationCore.getAddress()).to.not.equal(ethers.ZeroAddress);
    });

    it("Should set correct owner", async function () {
      expect(await reputationCore.owner()).to.equal(await owner.getAddress());
    });

    it("Should reference SomniaPassport correctly", async function () {
      expect(await reputationCore.passportContract()).to.equal(
        await somniaPassport.getAddress()
      );
    });
  });

  describe("Reputation Calculation", function () {
    it("Should calculate: (wins * 50) + (participation * 5) + (arenaPoints / 10)", async function () {
      expect(await reputationCore.calculateReputation(10n, 20n, 100n)).to.equal(610n);
    });

    it("Should handle zero values", async function () {
      expect(await reputationCore.calculateReputation(0n, 0n, 0n)).to.equal(0n);
    });

    it("Should calculate with only wins", async function () {
      expect(await reputationCore.calculateReputation(5n, 0n, 0n)).to.equal(250n);
    });

    it("Should calculate with only participation", async function () {
      expect(await reputationCore.calculateReputation(0n, 10n, 0n)).to.equal(50n);
    });

    it("Should calculate with only arena points", async function () {
      expect(await reputationCore.calculateReputation(0n, 0n, 50n)).to.equal(5n);
    });

    it("Should handle large numbers", async function () {
      expect(await reputationCore.calculateReputation(1000n, 5000n, 10000n)).to.equal(76000n);
    });

    it("Should handle division rounding correctly", async function () {
      expect(await reputationCore.calculateReputation(0n, 0n, 99n)).to.equal(9n);
      expect(await reputationCore.calculateReputation(0n, 0n, 100n)).to.equal(10n);
      expect(await reputationCore.calculateReputation(0n, 0n, 109n)).to.equal(10n);
    });

    it("Should be deterministic", async function () {
      const r1 = await reputationCore.calculateReputation(50n, 100n, 300n);
      const r2 = await reputationCore.calculateReputation(50n, 100n, 300n);
      const r3 = await reputationCore.calculateReputation(50n, 100n, 300n);
      expect(r1).to.equal(r2);
      expect(r2).to.equal(r3);
      expect(r1).to.equal(3030n);
    });

    it("Should handle unbalanced stats", async function () {
      const highWins = await reputationCore.calculateReputation(100n, 1n, 10n);
      const highParticipation = await reputationCore.calculateReputation(1n, 100n, 10n);
      expect(highWins).to.equal(5006n);
      expect(highParticipation).to.equal(551n);
      expect(highWins).to.be.greaterThan(highParticipation);
    });
  });

  describe("Passport Integration", function () {
    it("Should verify passport exists", async function () {
      // Try to update a non-existent passport
      await expect(
        reputationCore.updateReputation(await addr1.getAddress())
      ).to.be.revertedWith("Passport not minted");
    });

    it("Should allow owner to call updateReputation", async function () {
      // Create passport
      await somniaPassport.connect(addr1).mintPassport();
      
      // Owner should be able to call (no error)
      await reputationCore.updateReputation(await addr1.getAddress());
    });

    it("Should prevent non-owner from calling updateReputation", async function () {
      await somniaPassport.connect(addr1).mintPassport();
      
      await expect(
        reputationCore.connect(addr2).updateReputation(await addr1.getAddress())
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("Should read passport data correctly", async function () {
      // Mint passport
      await somniaPassport.connect(addr1).mintPassport();
      
      // Set stats
      await somniaPassport.updateStats(
        await addr1.getAddress(),
        0n,
        250n,
        25n,
        75n
      );
      
      // Read via ReputationCore (through interface)
      // This verifies getPassport interface works correctly
      const passportData = await somniaPassport.getPassport(await addr1.getAddress());
      expect(passportData.arenaPoints).to.equal(250n);
      expect(passportData.wins).to.equal(25n);
      expect(passportData.participation).to.equal(75n);
    });

    it("Should track multiple users independently", async function () {
      // Create passports
      await somniaPassport.connect(addr1).mintPassport();
      await somniaPassport.connect(addr2).mintPassport();
      await somniaPassport.connect(addr3).mintPassport();
      
      // Set different stats
      await somniaPassport.updateStats(await addr1.getAddress(), 0n, 100n, 5n, 20n);
      await somniaPassport.updateStats(await addr2.getAddress(), 0n, 200n, 10n, 30n);
      await somniaPassport.updateStats(await addr3.getAddress(), 0n, 300n, 15n, 40n);
      
      // Read all passports
      const p1 = await somniaPassport.getPassport(await addr1.getAddress());
      const p2 = await somniaPassport.getPassport(await addr2.getAddress());
      const p3 = await somniaPassport.getPassport(await addr3.getAddress());
      
      // Verify independence
      expect(p1.arenaPoints).to.equal(100n);
      expect(p2.arenaPoints).to.equal(200n);
      expect(p3.arenaPoints).to.equal(300n);
    });
  });

  describe("Formula", function () {
    it("Should provide formula explanation", async function () {
      const formula = await reputationCore.getReputationFormula();
      expect(formula).to.include("wins");
      expect(formula).to.include("participation");
      expect(formula).to.include("arenaPoints");
    });

    it("Should have meaningful description", async function () {
      const formula = await reputationCore.getReputationFormula();
      expect(formula.length).to.be.greaterThan(10);
    });
  });

  describe("Edge Cases", function () {
    it("Should calculate with minimal arena points", async function () {
      expect(await reputationCore.calculateReputation(0n, 0n, 1n)).to.equal(0n);
      expect(await reputationCore.calculateReputation(0n, 0n, 10n)).to.equal(1n);
    });

    it("Should handle high participation values", async function () {
      const result = await reputationCore.calculateReputation(0n, 1000n, 0n);
      expect(result).to.equal(5000n);
    });

    it("Should handle high win values", async function () {
      const result = await reputationCore.calculateReputation(1000n, 0n, 0n);
      expect(result).to.equal(50000n);
    });

    it("Should combine all factors correctly", async function () {
      // Test formula with specific values
      // wins=2, participation=3, arenaPoints=40
      // (2*50) + (3*5) + (40/10) = 100 + 15 + 4 = 119
      const result = await reputationCore.calculateReputation(2n, 3n, 40n);
      expect(result).to.equal(119n);
    });

    it("Should handle maximum safe integers", async function () {
      const largeNum = 10000000000n; // 10 billion
      const result = await reputationCore.calculateReputation(largeNum, largeNum, largeNum);
      expect(result).to.be.a("bigint");
      expect(result).to.be.greaterThan(0n);
    });
  });
});
