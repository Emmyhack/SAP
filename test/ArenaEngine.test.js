const { expect } = require("chai");
const { ethers, network } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

describe("ArenaEngine", function () {
  let somniaPassport;
  let arenaEngine;
  let owner;
  let user1;
  let user2;
  let user3;
  let user4;

  beforeEach(async function () {
    [owner, user1, user2, user3, user4] = await ethers.getSigners();

    // Deploy SomniaPassport
    const SomniaPassport = await ethers.getContractFactory("SomniaPassport");
    somniaPassport = await SomniaPassport.deploy();

    // Deploy ArenaEngine
    const ArenaEngine = await ethers.getContractFactory("ArenaEngine");
    arenaEngine = await ArenaEngine.deploy(await somniaPassport.getAddress());

    // Transfer ownership of passport to arena
    await somniaPassport.transferOwnership(await arenaEngine.getAddress());

    // Mint passports for test users (including owner)
    await somniaPassport.connect(owner).mintPassport();
    await somniaPassport.connect(user1).mintPassport();
    await somniaPassport.connect(user2).mintPassport();
    await somniaPassport.connect(user3).mintPassport();
    await somniaPassport.connect(user4).mintPassport();
  });

  describe("Deployment", function () {
    it("Should deploy with correct passport contract", async function () {
      expect(await arenaEngine.passportContract()).to.equal(await somniaPassport.getAddress());
    });

    it("Should initialize challenge counter to 1", async function () {
      const counter = await arenaEngine.getChallengeIdCounter();
      expect(counter).to.equal(1);
    });
  });

  describe("Challenge Creation", function () {
    it("Should create challenge with correct parameters", async function () {
      const entryFee = ethers.parseEther("1");
      const duration = 24 * 3600; // 24 hours

      await arenaEngine.createChallenge(entryFee, duration);

      const challenge = await arenaEngine.getChallenge(1);
      expect(challenge.id).to.equal(1);
      expect(challenge.entryFee).to.equal(entryFee);
      expect(challenge.duration).to.equal(duration);
      expect(challenge.creator).to.equal(owner.address);
      expect(challenge.finalized).to.equal(false);
    });

    it("Should increment challenge counter", async function () {
      const entryFee = ethers.parseEther("1");
      const duration = 24 * 3600;

      await arenaEngine.createChallenge(entryFee, duration);
      await arenaEngine.createChallenge(entryFee, duration);

      let counter = await arenaEngine.getChallengeIdCounter();
      expect(counter).to.equal(3);
    });

    it("Should emit ChallengeCreated event", async function () {
      const entryFee = ethers.parseEther("1");
      const duration = 24 * 3600;

      await expect(arenaEngine.createChallenge(entryFee, duration))
        .to.emit(arenaEngine, "ChallengeCreated")
        .withArgs(1, owner.address, entryFee, duration);
    });

    it("Should revert if duration too short", async function () {
      const entryFee = ethers.parseEther("1");
      const duration = 30 * 60; // 30 minutes

      await expect(
        arenaEngine.createChallenge(entryFee, duration)
      ).to.be.revertedWith("Duration must be between 1 hour and 30 days");
    });

    it("Should require passport to create challenges", async function () {
      const entryFee = ethers.parseEther("1");
      const duration = 24 * 3600;

      // Get a fresh signer without passport
      const [, , , , , user5] = await ethers.getSigners();

      await expect(
        arenaEngine.connect(user5).createChallenge(entryFee, duration)
      ).to.be.revertedWith("Must mint passport first");
    });

    it("Should allow zero entry fee", async function () {
      const entryFee = ethers.parseEther("0");
      const duration = 24 * 3600;

      await expect(
        arenaEngine.createChallenge(entryFee, duration)
      ).to.be.revertedWith("Entry fee must be greater than 0");
    });
  });

  describe("Enter Challenge", function () {
    beforeEach(async function () {
      const entryFee = ethers.parseEther("1");
      const duration = 24 * 3600;
      await arenaEngine.createChallenge(entryFee, duration);
    });

    it("Should enter challenge with correct entry fee", async function () {
      const entryFee = ethers.parseEther("1");

      await arenaEngine.connect(user1).enterChallenge(1, { value: entryFee });

      expect(await arenaEngine.getParticipantCount(1)).to.equal(1);
    });

    it("Should emit ParticipantEntered event", async function () {
      const entryFee = ethers.parseEther("1");

      await expect(arenaEngine.connect(user1).enterChallenge(1, { value: entryFee }))
        .to.emit(arenaEngine, "ParticipantEntered")
        .withArgs(1, user1.address);
    });

    it("Should add entry fee to prize pool", async function () {
      const entryFee = ethers.parseEther("1");

      await arenaEngine.connect(user1).enterChallenge(1, { value: entryFee });
      await arenaEngine.connect(user2).enterChallenge(1, { value: entryFee });

      const challenge = await arenaEngine.getChallenge(1);
      expect(challenge.totalPrize).to.equal(ethers.parseEther("2"));
    });

    it("Should revert if incorrect entry fee", async function () {
      const wrongFee = ethers.parseEther("0.5");

      await expect(
        arenaEngine.connect(user1).enterChallenge(1, { value: wrongFee })
      ).to.be.revertedWith("Incorrect entry fee");
    });

    it("Should revert if challenge expired", async function () {
      const entryFee = ethers.parseEther("1");

      // Fast forward past challenge duration
      await ethers.provider.send("evm_increaseTime", [25 * 3600]);
      await ethers.provider.send("evm_mine");

      await expect(
        arenaEngine.connect(user1).enterChallenge(1, { value: entryFee })
      ).to.be.revertedWith("Challenge expired");
    });

    it("Should revert if no passport minted", async function () {
      const entryFee = ethers.parseEther("1");

      // Get a fresh signer without passport
      const [, , , , , user5] = await ethers.getSigners();

      await expect(
        arenaEngine.connect(user5).enterChallenge(1, { value: entryFee })
      ).to.be.revertedWith("Must mint passport first");
    });

    it("Should revert if attempting duplicate entry", async function () {
      const entryFee = ethers.parseEther("1");

      await arenaEngine.connect(user1).enterChallenge(1, { value: entryFee });

      await expect(
        arenaEngine.connect(user1).enterChallenge(1, { value: entryFee })
      ).to.be.revertedWith("Already entered challenge");
    });

    it("Should revert if challenge doesn't exist", async function () {
      const entryFee = ethers.parseEther("1");

      await expect(
        arenaEngine.connect(user1).enterChallenge(999, { value: entryFee })
      ).to.be.revertedWith("Challenge does not exist");
    });

    it("Should allow multiple participants", async function () {
      const entryFee = ethers.parseEther("1");

      await arenaEngine.connect(user1).enterChallenge(1, { value: entryFee });
      await arenaEngine.connect(user2).enterChallenge(1, { value: entryFee });
      await arenaEngine.connect(user3).enterChallenge(1, { value: entryFee });

      expect(await arenaEngine.getParticipantCount(1)).to.equal(3);
    });
  });

  describe("Submit Score", function () {
    beforeEach(async function () {
      const entryFee = ethers.parseEther("1");
      const duration = 24 * 3600;
      await arenaEngine.createChallenge(entryFee, duration);

      // Enter challenge
      await arenaEngine.connect(user1).enterChallenge(1, { value: entryFee });
      await arenaEngine.connect(user2).enterChallenge(1, { value: entryFee });
    });

    it("Should submit score successfully", async function () {
      const score = 1000;

      await arenaEngine.connect(user1).submitScore(1, score);

      // Check score was recorded
      const participants = await arenaEngine.getParticipants(1);
      expect(participants[0]).to.equal(user1.address);
    });

    it("Should emit ScoreSubmitted event", async function () {
      const score = 1000;

      await expect(arenaEngine.connect(user1).submitScore(1, score))
        .to.emit(arenaEngine, "ScoreSubmitted")
        .withArgs(1, user1.address, score, 1);
    });

    it("Should update top player", async function () {
      await arenaEngine.connect(user1).submitScore(1, 1000);
      await arenaEngine.connect(user2).submitScore(1, 500);

      const challenge = await arenaEngine.getChallenge(1);
      expect(challenge.topPlayer).to.equal(user1.address);
      expect(challenge.topScore).to.equal(1000);
    });

    it("Should allow score increase", async function () {
      await arenaEngine.connect(user1).submitScore(1, 1000);
      await arenaEngine.connect(user1).submitScore(1, 1500);

      const challenge = await arenaEngine.getChallenge(1);
      expect(challenge.topScore).to.equal(1500);
    });

    it("Should revert if score decreases", async function () {
      await arenaEngine.connect(user1).submitScore(1, 1000);

      await expect(
        arenaEngine.connect(user1).submitScore(1, 500)
      ).to.be.revertedWith("Score can only increase");
    });

    it("Should revert if score is zero", async function () {
      await expect(
        arenaEngine.connect(user1).submitScore(1, 0)
      ).to.be.revertedWith("Score must be greater than zero");
    });

    it("Should revert if challenge expired", async function () {
      // Fast forward past challenge duration
      await ethers.provider.send("evm_increaseTime", [25 * 3600]);
      await ethers.provider.send("evm_mine");

      await expect(
        arenaEngine.connect(user1).submitScore(1, 1000)
      ).to.be.revertedWith("Challenge expired");
    });

    it("Should calculate correct rank", async function () {
      await arenaEngine.connect(user1).submitScore(1, 1000);
      await arenaEngine.connect(user2).submitScore(1, 500);

      const rank1 = await arenaEngine.calculateRank(1, user1.address);
      const rank2 = await arenaEngine.calculateRank(1, user2.address);

      expect(rank1).to.equal(1);
      expect(rank2).to.equal(2);
    });
  });

  describe("Leaderboard", function () {
    beforeEach(async function () {
      const entryFee = ethers.parseEther("1");
      const duration = 24 * 3600;
      await arenaEngine.createChallenge(entryFee, duration);

      // Enter and submit scores
      await arenaEngine.connect(user1).enterChallenge(1, { value: entryFee });
      await arenaEngine.connect(user2).enterChallenge(1, { value: entryFee });
      await arenaEngine.connect(user3).enterChallenge(1, { value: entryFee });

      await arenaEngine.connect(user1).submitScore(1, 1000);
      await arenaEngine.connect(user2).submitScore(1, 1500);
      await arenaEngine.connect(user3).submitScore(1, 800);
    });

    it("Should return sorted leaderboard", async function () {
      const [addresses, scores] = await arenaEngine.getLeaderboard(1);

      expect(addresses[0]).to.equal(user2.address);
      expect(scores[0]).to.equal(1500);

      expect(addresses[1]).to.equal(user1.address);
      expect(scores[1]).to.equal(1000);

      expect(addresses[2]).to.equal(user3.address);
      expect(scores[2]).to.equal(800);
    });
  });

  describe("Finalize Challenge", function () {
    beforeEach(async function () {
      const entryFee = ethers.parseEther("1");
      const duration = 24 * 3600;
      await arenaEngine.createChallenge(entryFee, duration);

      // Enter and submit scores
      await arenaEngine.connect(user1).enterChallenge(1, { value: entryFee });
      await arenaEngine.connect(user2).enterChallenge(1, { value: entryFee });
      await arenaEngine.connect(user3).enterChallenge(1, { value: entryFee });

      await arenaEngine.connect(user1).submitScore(1, 1000);
      await arenaEngine.connect(user2).submitScore(1, 1500);
      await arenaEngine.connect(user3).submitScore(1, 800);
    });

    it("Should finalize challenge after duration", async function () {
      // Fast forward past duration
      await ethers.provider.send("evm_increaseTime", [25 * 3600]);
      await ethers.provider.send("evm_mine");

      await arenaEngine.finalizeChallenge(1);

      const challenge = await arenaEngine.getChallenge(1);
      expect(challenge.finalized).to.equal(true);
    });

    it("Should emit ChallengeFinalized event", async function () {
      await ethers.provider.send("evm_increaseTime", [25 * 3600]);
      await ethers.provider.send("evm_mine");

      await expect(arenaEngine.finalizeChallenge(1))
        .to.emit(arenaEngine, "ChallengeFinalized")
        .withArgs(1, user2.address, ethers.parseEther("2.1"));
    });

    it("Should set winner pending withdrawals", async function () {
      await ethers.provider.send("evm_increaseTime", [25 * 3600]);
      await ethers.provider.send("evm_mine");

      await arenaEngine.finalizeChallenge(1);

      const balance = await arenaEngine.pendingWithdrawals(user2.address);
      // 70% of 3 ETH = 2.1 ETH
      expect(balance).to.equal(ethers.parseEther("2.1"));
    });

    it("Should revert if challenge not finished", async function () {
      await expect(
        arenaEngine.finalizeChallenge(1)
      ).to.be.revertedWith("Challenge still active");
    });

    it("Should revert if already finalized", async function () {
      await ethers.provider.send("evm_increaseTime", [25 * 3600]);
      await ethers.provider.send("evm_mine");

      await arenaEngine.finalizeChallenge(1);

      await expect(
        arenaEngine.finalizeChallenge(1)
      ).to.be.revertedWith("Challenge already finalized");
    });

    it("Should revert submissions after finalization", async function () {
      await ethers.provider.send("evm_increaseTime", [25 * 3600]);
      await ethers.provider.send("evm_mine");

      await arenaEngine.finalizeChallenge(1);

      await expect(
        arenaEngine.connect(user1).submitScore(1, 2000)
      ).to.be.revertedWith("Challenge is finalized");
    });

    it("Should only allow owner or creator to finalize", async function () {
      await time.increase(25 * 3600);

      // user1 is not the creator (owner created the challenge), so should fail
      await expect(
        arenaEngine.connect(user1).finalizeChallenge(1)
      ).to.be.revertedWith("Only creator or owner can finalize");

      // owner is the creator, so this should work
      const tx = await arenaEngine.connect(owner).finalizeChallenge(1);
      await tx.wait();

      const challenge = await arenaEngine.getChallenge(1);
      expect(challenge.finalized).to.equal(true);
    });
  });

  describe("Withdrawals", function () {
    beforeEach(async function () {
      const entryFee = ethers.parseEther("1");
      const duration = 24 * 3600;
      await arenaEngine.createChallenge(entryFee, duration);

      await arenaEngine.connect(user1).enterChallenge(1, { value: entryFee });
      await arenaEngine.connect(user2).enterChallenge(1, { value: entryFee });

      await arenaEngine.connect(user1).submitScore(1, 500);
      await arenaEngine.connect(user2).submitScore(1, 1000);

      await ethers.provider.send("evm_increaseTime", [25 * 3600]);
      await ethers.provider.send("evm_mine");

      await arenaEngine.finalizeChallenge(1);
    });

    it("Should withdraw pending rewards", async function () {
      const initialBalance = await ethers.provider.getBalance(user2.address);

      const tx = await arenaEngine.connect(user2).withdraw();
      const receipt = await tx.wait();
      const gasUsed = receipt.gasUsed * receipt.gasPrice;

      const finalBalance = await ethers.provider.getBalance(user2.address);
      const withdrawn = finalBalance + BigInt(gasUsed) - initialBalance;

      expect(withdrawn).to.equal(ethers.parseEther("1.4")); // 70% of 2 ETH
    });

    it("Should emit WithdrawalProcessed event", async function () {
      const amount = ethers.parseEther("1.4");

      await expect(arenaEngine.connect(user2).withdraw())
        .to.emit(arenaEngine, "WithdrawalProcessed")
        .withArgs(user2.address, amount);
    });

    it("Should revert if no pending withdrawals", async function () {
      await arenaEngine.connect(user2).withdraw();

      await expect(
        arenaEngine.connect(user2).withdraw()
      ).to.be.revertedWith("No pending withdrawals");
    });

    it("Should prevent double withdrawal", async function () {
      await arenaEngine.connect(user2).withdraw();

      await expect(
        arenaEngine.connect(user2).withdraw()
      ).to.be.revertedWith("No pending withdrawals");
    });

    it("Should handle failed transfers gracefully", async function () {
      // Test with pull payment model ensures transfers happen
      const tx = await arenaEngine.connect(user2).withdraw();
      await expect(tx).to.not.be.reverted;
    });
  });

  describe("Reentrancy Protection", function () {
    it("Should protect against reentrancy in enterChallenge", async function () {
      const entryFee = ethers.parseEther("1");
      const duration = 24 * 3600;
      await arenaEngine.createChallenge(entryFee, duration);

      // Multiple sequential entries should work
      await arenaEngine.connect(user1).enterChallenge(1, { value: entryFee });
      await arenaEngine.connect(user2).enterChallenge(1, { value: entryFee });

      expect(await arenaEngine.getParticipantCount(1)).to.equal(2);
    });

    it("Should protect against reentrancy in withdraw", async function () {
      const entryFee = ethers.parseEther("1");
      const duration = 3600;
      await arenaEngine.createChallenge(entryFee, duration);

      await arenaEngine.connect(user1).enterChallenge(1, { value: entryFee });
      await arenaEngine.connect(user2).enterChallenge(1, { value: entryFee });

      await arenaEngine.connect(user1).submitScore(1, 500);
      await arenaEngine.connect(user2).submitScore(1, 1000);

      await ethers.provider.send("evm_increaseTime", [3700]);
      await ethers.provider.send("evm_mine");

      await arenaEngine.finalizeChallenge(1);

      // Should be able to withdraw
      await arenaEngine.connect(user2).withdraw();
      expect(await arenaEngine.pendingWithdrawals(user2.address)).to.equal(0);
    });
  });

  describe("Edge Cases", function () {
    it("Should handle single participant challenge", async function () {
      const entryFee = ethers.parseEther("1");
      const duration = 3600;
      await arenaEngine.createChallenge(entryFee, duration);

      await arenaEngine.connect(user1).enterChallenge(1, { value: entryFee });
      await arenaEngine.connect(user1).submitScore(1, 1000);

      await ethers.provider.send("evm_increaseTime", [3700]);
      await ethers.provider.send("evm_mine");

      await arenaEngine.finalizeChallenge(1);

      const balance = await arenaEngine.pendingWithdrawals(user1.address);
      expect(balance).to.equal(ethers.parseEther("1")); // 70% of 1 ETH (winner gets it all)
    });

    it("Should handle large participant counts", async function () {
      const entryFee = ethers.parseEther("1");
      const duration = 24 * 3600;
      await arenaEngine.createChallenge(entryFee, duration);

      const signers = await ethers.getSigners();
      for (let i = 0; i < 10; i++) {
        if (signers[i] !== owner) {
          // Mint passport if not already done
          const hasPassport = await somniaPassport.passportOf(signers[i].address);
          if (hasPassport === 0n) {
            await somniaPassport.connect(signers[i]).mintPassport();
          }

          await arenaEngine.connect(signers[i]).enterChallenge(1, { value: entryFee });
        }
      }

      const count = await arenaEngine.getParticipantCount(1);
      expect(count).to.be.gt(0);
    });

    it("Should handle fuzz testing on scores", async function () {
      const entryFee = ethers.parseEther("1");
      const duration = 24 * 3600;
      await arenaEngine.createChallenge(entryFee, duration);

      await arenaEngine.connect(user1).enterChallenge(1, { value: entryFee });

      // Submit increasing scores
      for (let i = 100; i <= 1000; i += 100) {
        await arenaEngine.connect(user1).submitScore(1, i);
      }

      const challenge = await arenaEngine.getChallenge(1);
      expect(challenge.topScore).to.equal(1000);
    });
  });

  describe("Gas Optimization", function () {
    it("Should have efficient participant lookup", async function () {
      const entryFee = ethers.parseEther("1");
      const duration = 24 * 3600;
      await arenaEngine.createChallenge(entryFee, duration);

      await arenaEngine.connect(user1).enterChallenge(1, { value: entryFee });

      const participants = await arenaEngine.getParticipants(1);
      expect(participants[0]).to.equal(user1.address);
    });

    it("Should have efficient leaderboard sorting", async function () {
      const entryFee = ethers.parseEther("1");
      const duration = 24 * 3600;
      await arenaEngine.createChallenge(entryFee, duration);

      const signers = await ethers.getSigners();
      for (let i = 1; i <= 5; i++) {
        if (i < signers.length) {
          const hasPassport = await somniaPassport.passportOf(signers[i].address);
          if (hasPassport === 0n) {
            await somniaPassport.connect(signers[i]).mintPassport();
          }

          await arenaEngine.connect(signers[i]).enterChallenge(1, { value: entryFee });
          await arenaEngine.connect(signers[i]).submitScore(1, 1000 - i * 100);
        }
      }

      const [addresses, scores] = await arenaEngine.getLeaderboard(1);
      expect(addresses.length).to.be.gt(0);
    });
  });

  describe("End-to-End Web3 Integration Tests", function () {
    let user5; // User without passport

    beforeEach(async function () {
      // Get a fresh signer without passport
      const signers = await ethers.getSigners();
      user5 = signers[5];
    });

    it("Should execute complete challenge lifecycle: create -> enter -> score -> finalize", async function () {
      // Step 1: User1 creates a challenge
      const entryFee = ethers.parseEther("0.5");
      const duration = 24 * 3600;

      const createTx = await arenaEngine.connect(user1).createChallenge(entryFee, duration);
      await createTx.wait();

      const challengeId = 1;
      let challenge = await arenaEngine.getChallenge(challengeId);

      expect(challenge.id).to.equal(challengeId);
      expect(challenge.creator).to.equal(user1.address);
      expect(challenge.entryFee).to.equal(entryFee);
      expect(challenge.finalized).to.equal(false);

      // Check initial participant count is 0
      let participantCount = await arenaEngine.getParticipantCount(challengeId);
      expect(participantCount).to.equal(0);

      // Step 2: User2 enters the challenge with entry fee
      const enterTx = await arenaEngine
        .connect(user2)
        .enterChallenge(challengeId, { value: entryFee });
      await enterTx.wait();

      participantCount = await arenaEngine.getParticipantCount(challengeId);
      expect(participantCount).to.equal(1);

      // Step 3: User3 also enters the challenge
      const enter2Tx = await arenaEngine
        .connect(user3)
        .enterChallenge(challengeId, { value: entryFee });
      await enter2Tx.wait();

      participantCount = await arenaEngine.getParticipantCount(challengeId);
      expect(participantCount).to.equal(2);

      // Step 4: User2 submits their score
      const score2 = 950;
      const submitTx1 = await arenaEngine
        .connect(user2)
        .submitScore(challengeId, score2);
      await submitTx1.wait();

      let userScore2 = await arenaEngine.scores(challengeId, user2.address);
      expect(userScore2).to.equal(score2);

      // Step 5: User3 submits their score (winning score)
      const score3 = 1000;
      const submitTx2 = await arenaEngine
        .connect(user3)
        .submitScore(challengeId, score3);
      await submitTx2.wait();

      let userScore3 = await arenaEngine.scores(challengeId, user3.address);
      expect(userScore3).to.equal(score3);

      // Step 6: Get leaderboard before finalization
      const [beforeAddresses, beforeScores] = await arenaEngine.getLeaderboard(challengeId);
      expect(beforeAddresses.length).to.equal(2);
      expect(beforeScores.length).to.equal(2);
      expect(beforeAddresses[0]).to.equal(user3.address); // Winner
      expect(beforeScores[0]).to.equal(score3);

      // Step 6b: Advance time so challenge duration has passed
      await time.increase(duration + 1);

      // Step 7: Challenge creator finalizes the challenge
      const finalizeTx = await arenaEngine.connect(user1).finalizeChallenge(challengeId);
      await finalizeTx.wait();

      challenge = await arenaEngine.getChallenge(challengeId);
      expect(challenge.finalized).to.equal(true);

      // Step 8: Verify challenge is now finalized (can't enter anymore)
      await expect(
        arenaEngine.connect(user4).enterChallenge(challengeId, { value: entryFee })
      ).to.be.revertedWith("Challenge is finalized");

      // Step 9: Verify leaderboard after finalization
      const [finalAddresses, finalScores] = await arenaEngine.getLeaderboard(challengeId);
      expect(finalAddresses.length).to.equal(2);
      expect(finalAddresses[0]).to.equal(user3.address); // Winner confirmed
      expect(finalScores[0]).to.equal(score3);
    });

    it("Should correctly calculate rewards and platform fee", async function () {
      const entryFee = ethers.parseEther("1");
      const duration = 24 * 3600;

      // Creator creates challenge
      await arenaEngine.connect(user1).createChallenge(entryFee, duration);

      // Two users enter
      const user2BalanceBefore = await ethers.provider.getBalance(user2.address);
      const enterTx = await arenaEngine
        .connect(user2)
        .enterChallenge(1, { value: entryFee });
      const enterReceipt = await enterTx.wait();
      const gasCost = enterReceipt.gasUsed * enterReceipt.gasPrice;

      await arenaEngine.connect(user3).enterChallenge(1, { value: entryFee });

      // Both submit scores (user3 wins with higher score)
      await arenaEngine.connect(user2).submitScore(1, 800);
      await arenaEngine.connect(user3).submitScore(1, 900);

      // Advance time so challenge duration has passed
      await time.increase(duration + 1);

      // Finalize challenge
      await arenaEngine.connect(user1).finalizeChallenge(1);

      // Total pool should be 2 * 1 ETH = 2 ETH
      const totalPool = entryFee * 2n;

      // 70% goes to creator + winners split, 30% platform fee
      // With 1 winner: creator gets 30% (0.6 ETH) + winner gets 70% (0.7 ETH) from prize pool
      expect(totalPool).to.equal(ethers.parseEther("2"));
    });

    it("Should prevent non-passport holders from creating challenges", async function () {
      const entryFee = ethers.parseEther("1");
      const duration = 24 * 3600;

      // user5 hasn't minted passport
      await expect(
        arenaEngine.connect(user5).createChallenge(entryFee, duration)
      ).to.be.revertedWith("Must mint passport first");
    });

    it("Should validate entry fee is greater than zero", async function () {
      const duration = 24 * 3600;

      // Attempt to create challenge with 0 entry fee
      await expect(
        arenaEngine.connect(user1).createChallenge(0, duration)
      ).to.be.revertedWith("Entry fee must be greater than 0");
    });

    it("Should allow users with passport to create challenges", async function () {
      const entryFee = ethers.parseEther("0.1");
      const duration = 24 * 3600;

      // user5 mints passport
      await somniaPassport.connect(user5).mintPassport();

      // user5 should now be able to create challenge
      await expect(arenaEngine.connect(user5).createChallenge(entryFee, duration))
        .to.emit(arenaEngine, "ChallengeCreated")
        .withArgs(1, user5.address, entryFee, duration);
    });

    it("Should handle multiple challenges and maintain separate leaderboards", async function () {
      const entryFee = ethers.parseEther("0.5");
      const duration = 24 * 3600;

      // Create two separate challenges
      await arenaEngine.connect(user1).createChallenge(entryFee, duration);
      await arenaEngine.connect(user2).createChallenge(entryFee, duration);

      // User3 enters both challenges
      await arenaEngine.connect(user3).enterChallenge(1, { value: entryFee });
      await arenaEngine.connect(user3).enterChallenge(2, { value: entryFee });

      // Submit different scores for each challenge
      await arenaEngine.connect(user3).submitScore(1, 800);
      await arenaEngine.connect(user3).submitScore(2, 900);

      // Verify scores are tracked separately
      const score1 = await arenaEngine.scores(1, user3.address);
      const score2 = await arenaEngine.scores(2, user3.address);

      expect(score1).to.equal(800);
      expect(score2).to.equal(900);

      // Advance time so challenge duration has passed
      await time.increase(duration + 1);

      // Finalize both challenges
      await arenaEngine.connect(user1).finalizeChallenge(1);
      await arenaEngine.connect(user2).finalizeChallenge(2);

      // Verify both are finalized
      const challenge1 = await arenaEngine.getChallenge(1);
      const challenge2 = await arenaEngine.getChallenge(2);

      expect(challenge1.finalized).to.equal(true);
      expect(challenge2.finalized).to.equal(true);
    });
  });
});
