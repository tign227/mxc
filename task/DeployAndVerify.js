
const { task } = require("hardhat/config");

task("deployAndVerify", "Deploys and verifies the ETHPool contract")
  .setAction(async (taskArgs, { ethers, run }) => {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying ETHPool contract with the account:", deployer.address);

    const ETHPool = await ethers.getContractFactory("ETHPool");
    const ethPool = await ETHPool.deploy();
    console.log("ETHPool deployed to:", ethPool.target);

    // Verify the contract
    await run("verify:verify", {
      address: ethPool.target,
      constructorArguments: [],
    });

    
  });