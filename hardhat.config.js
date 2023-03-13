require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

const PrivateKey = "8f832ddb358653e315aaa3677726f913660cb6bc3d63982f46a94ae14084f47b";
module.exports = {
  solidity: "0.8.18",
  paths: {
    artifacts: './src/artifacts',
  },
  defaultNetwork: "huaweiyun",
  networks: {
    hardhat:{
      chainId: 67,
    },
    huaweiyun: {
      chainId: 67,
      url: "http://110.41.154.234:8545/",
      accounts: ["8f832ddb358653e315aaa3677726f913660cb6bc3d63982f46a94ae14084f47b"],
    },

    polygon: {
      chainId: 137,
      url: "https://rpc.ankr.com/polygon",
      accounts: ["8f832ddb358653e315aaa3677726f913660cb6bc3d63982f46a94ae14084f47b"],
    },

    tbsc: {
      chainId: 97,
      url: "https://endpoints.omniatech.io/v1/bsc/testnet/public",
      accounts: ["8f832ddb358653e315aaa3677726f913660cb6bc3d63982f46a94ae14084f47b"],
    }
  }
};
