// Test file for ETHPool contract using Hardhat

const { expect } = require('chai');

describe('ETHPool', function () {
  let ETHPool;
  let ethPool;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    ETHPool = await ethers.getContractFactory('ETHPool');
    ethPool = await ETHPool.deploy();
  });

  it('Should deposit ETH and calculate rewards correctly', async function () {
    await ethPool.connect(addr1).deposit({ value: ethers.parseEther('1') });
    await ethPool.connect(addr2).deposit({ value: ethers.parseEther('2') });

    expect(await ethPool.deposit(addr1.address)).to.equal(ethers.parseEther('1'));
    expect(await ethPool.deposit(addr2.address)).to.equal(ethers.parseEther('2'));

    await ethPool.depositRewards(100);

    await ethPool.connect(addr1).withdraw();
    await ethPool.connect(addr2).withdraw();

    expect(await ethPool.getDeposit(addr1.address)).to.equal(0);
    expect(await ethPool.getDeposit(addr2.address)).to.equal(0);

    expect(await ethPool.getRewards(addr1.address)).to.equal(150);
    expect(await ethPool.getRewards(addr2.address)).to.equal(450);

    expect(await ethPool.getTotalDeposits()).to.equal(0);
  });
});