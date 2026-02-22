const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("🚀 Starting Somnia Arena Passport Deployment...\n");

  // Get deployer account
  const [deployer] = await ethers.getSigners();
  console.log(`📍 Deploying from account: ${deployer.address}`);

  // Get network info
  const network = await ethers.provider.getNetwork();
  console.log(`🔗 Network: ${network.name} (Chain ID: ${network.chainId})\n`);

  // ============================================
  // STEP 1: Deploy SomniaPassport
  // ============================================
  console.log("📝 Step 1: Deploying SomniaPassport contract...");
  const SomniaPassport = await ethers.getContractFactory("SomniaPassport");
  const somniaPassport = await SomniaPassport.deploy();
  await somniaPassport.waitForDeployment();
  const passportAddress = await somniaPassport.getAddress();
  console.log(`✅ SomniaPassport deployed at: ${passportAddress}\n`);

  // ============================================
  // STEP 2: Deploy ArenaEngine
  // ============================================
  console.log("⚔️  Step 2: Deploying ArenaEngine contract...");
  const ArenaEngine = await ethers.getContractFactory("ArenaEngine");
  const arenaEngine = await ArenaEngine.deploy(passportAddress);
  await arenaEngine.waitForDeployment();
  const arenaAddress = await arenaEngine.getAddress();
  console.log(`✅ ArenaEngine deployed at: ${arenaAddress}\n`);

  // ============================================
  // STEP 3: Deploy ReputationCore
  // ============================================
  console.log("📊 Step 3: Deploying ReputationCore contract...");
  const ReputationCore = await ethers.getContractFactory("ReputationCore");
  const reputationCore = await ReputationCore.deploy(passportAddress);
  await reputationCore.waitForDeployment();
  const reputationAddress = await reputationCore.getAddress();
  console.log(`✅ ReputationCore deployed at: ${reputationAddress}\n`);

  // ============================================
  // STEP 4: Verify Deployments
  // ============================================
  console.log("🔍 Verifying deployments...");

  try {
    // Verify SomniaPassport
    const passportOwner = await somniaPassport.owner();
    console.log(`   ✓ SomniaPassport owner: ${passportOwner}`);

    // Verify ArenaEngine
    const arenaPassportAddress = await arenaEngine.passportContract();
    console.log(`   ✓ ArenaEngine passport ref: ${arenaPassportAddress}`);

    // Verify ReputationCore
    const repPassportAddress = await reputationCore.passportContract();
    console.log(`   ✓ ReputationCore passport ref: ${repPassportAddress}`);
  } catch (error) {
    console.error("⚠️  Verification error:", error.message);
  }

  // ============================================
  // STEP 5: Update .env with contract addresses
  // ============================================
  console.log("\n📝 Updating .env with deployed addresses...");

  let envPath = path.join(__dirname, "../.env");
  let envContent = fs.readFileSync(envPath, "utf8");

  // Determine network suffix based on chain ID
  const networkSuffix = network.chainId === 50312n ? "TESTNET" : "MAINNET";

  // Update contract addresses in .env
  envContent = envContent.replace(
    new RegExp(`SOMNIA_${networkSuffix}_PASSPORT_ADDRESS=.*`),
    `SOMNIA_${networkSuffix}_PASSPORT_ADDRESS=${passportAddress}`
  );

  envContent = envContent.replace(
    new RegExp(`SOMNIA_${networkSuffix}_ARENA_ENGINE_ADDRESS=.*`),
    `SOMNIA_${networkSuffix}_ARENA_ENGINE_ADDRESS=${arenaAddress}`
  );

  envContent = envContent.replace(
    new RegExp(`SOMNIA_${networkSuffix}_REPUTATION_CORE_ADDRESS=.*`),
    `SOMNIA_${networkSuffix}_REPUTATION_CORE_ADDRESS=${reputationAddress}`
  );

  fs.writeFileSync(envPath, envContent, "utf8");
  console.log("✅ .env updated successfully\n");

  // ============================================
  // STEP 6: Log Deployment Summary
  // ============================================
  console.log("╔════════════════════════════════════════════════════════════════╗");
  console.log("║          DEPLOYMENT SUMMARY - SOMNIA ARENA PASSPORT           ║");
  console.log("╚════════════════════════════════════════════════════════════════╝\n");

  console.log(`Network: ${network.name} (Chain ID: ${network.chainId})`);
  console.log(`Deployer: ${deployer.address}\n`);

  console.log("Smart Contracts Deployed:");
  console.log(`  1. SomniaPassport`);
  console.log(`     Address: ${passportAddress}`);
  console.log(`     Type: ERC721 Soulbound Token\n`);

  console.log(`  2. ArenaEngine`);
  console.log(`     Address: ${arenaAddress}`);
  console.log(`     Type: Challenge Management\n`);

  console.log(`  3. ReputationCore`);
  console.log(`     Address: ${reputationAddress}`);
  console.log(`     Type: Reputation Engine\n`);

  console.log("📚 Explorer Links:");
  if (network.chainId === 50312n) {
    console.log(`   Testnet Explorer: https://shannon-explorer.somnia.network/address/${passportAddress}`);
  } else if (network.chainId === 5031n) {
    console.log(`   Mainnet Explorer: https://explorer.somnia.network/address/${passportAddress}`);
  }

  console.log("\n✅ Deployment complete! Contracts are ready for use.\n");

  // ============================================
  // STEP 7: Save deployment info to file
  // ============================================
  const deploymentInfo = {
    network: {
      name: network.name,
      chainId: network.chainId.toString(),
    },
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    contracts: {
      SomniaPassport: {
        address: passportAddress,
        type: "ERC721Soulbound",
      },
      ArenaEngine: {
        address: arenaAddress,
        type: "ChallengeManagement",
      },
      ReputationCore: {
        address: reputationAddress,
        type: "ReputationEngine",
      },
    },
  };

  const deploymentPath = path.join(__dirname, `../deployments/somnia-${network.chainId === 50312n ? "testnet" : "mainnet"}-deployment.json`);
  const deploymentDir = path.dirname(deploymentPath);

  if (!fs.existsSync(deploymentDir)) {
    fs.mkdirSync(deploymentDir, { recursive: true });
  }

  fs.writeFileSync(deploymentPath, JSON.stringify(deploymentInfo, null, 2), "utf8");
  console.log(`📋 Deployment info saved to: ${deploymentPath}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
