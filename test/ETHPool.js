const { expect, assert } = require("chai");

describe("ETHPool", function () {
  let ETHPool;
  let ethPool;
  let team;
  let addrA;
  let addrB;

  beforeEach(async function () {
    [team, addrA, addrB] = await ethers.getSigners();

    ETHPool = await ethers.getContractFactory("ETHPool");
    ethPool = await ETHPool.deploy();
  });

  it("Should allow A to withdraw 150 and B to withdraw 450 after depositing rewards", async function () {
    await ethPool.connect(addrA).deposit({ value: ethers.parseEther("100") });
    await ethPool.connect(addrB).deposit({ value: ethers.parseEther("300") });

    const rewards = ethers.parseEther("200")
    await ethPool.connect(team).depositRewards({value: rewards});

    await ethPool.connect(addrA).withdraw();
    await ethPool.connect(addrB).withdraw();

    const balanceForA = await ethers.provider.getBalance(addrA.address);
    console.log("Address A ETH balance:", ethers.formatEther(balanceForA));

    const balanceForB = await ethers.provider.getBalance(addrB.address);
    console.log("Address B ETH balance:", ethers.formatEther(balanceForB));
  });

  it("Should test deposit, withdraw order for A and B", async function () {
    await ethPool.connect(addrA).deposit({ value: ethers.parseEther("100") });

    const rewards = ethers.parseEther("200");
    await ethPool.connect(team).depositRewards({ value: rewards });

    await ethPool.connect(addrB).deposit({ value: ethers.parseEther("300") });

    await ethPool.connect(addrA).withdraw();

    await ethPool.connect(addrB).withdraw();

    const balanceForA = await ethers.provider.getBalance(addrA.address);
    console.log("Address A ETH balance:", ethers.formatEther(balanceForA));

    const balanceForB = await ethers.provider.getBalance(addrB.address);
    console.log("Address B ETH balance:", ethers.formatEther(balanceForB));
  });
});