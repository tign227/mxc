task("interact", "Interact with contract")
  .addParam("contractAddress", "The address of the ETHPool contract")
  .addParam("addrA", "Address of user A")
  .addParam("addrB", "Address of user B")
  .setAction(async (taskArgs, { ethers }) => {
    const { contractAddress, addrA, addrB } = taskArgs;
    const [team] = await ethers.getSigners();
    const ETHPool = await ethers.getContractFactory("ETHPool");
    const ethPool = await ETHPool.attach(contractAddress);

    await ethPool.connect(addrA).deposit({ value: ethers.utils.parseEther("100") });
    const rewards = ethers.utils.parseEther("200");
    await ethPool.connect(team).depositRewards({ value: rewards });
    await ethPool.connect(addrB).deposit({ value: ethers.utils.parseEther("300") });
    await ethPool.connect(addrA).withdraw();
    await ethPool.connect(addrB).withdraw();
  });