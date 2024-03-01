require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
// require("@nomicfoundation/hardhat-verify");
require("./task/DeployAndVerify");
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.0",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_SEPOLIA_API}`,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan:{
    apiKey: process.env.ETHERSCAN_API_KEY
  },
  sourcify: {
    enabled: true
  }
  // npx hardhat verify --network sepolia 0x7098482880DD70cA9eBd6fa1c3D49cc8740e5F4A

};
