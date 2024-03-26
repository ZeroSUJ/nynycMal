import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import {mnemonic, bscscanApiKey} from './secrets.json';

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    testnet: {
      url: "https://data-seed-prebsc-1-s1.bnbchain.org:8545",
      chainId: 97,
      gasPrice: 20000000000,
      accounts: {mnemonic: mnemonic}
    },
    mainnet: {
      url: "https://bsc-dataseed.bnbchain.org/",
      chainId: 56,
      gasPrice: 20000000000,
      accounts: {mnemonic: mnemonic}
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://bscscan.com/
    apiKey: bscscanApiKey
  }
};
export default config;
// module.exports = {
//   defaultNetwork: "mainnet",
//   networks: {
//     localhost: {
//       url: "http://127.0.0.1:8545"
//     },
//     hardhat: {
//     },
//   },
//   solidity: {
//   version: "0.8.9",
//   settings: {
//     optimizer: {
//       enabled: true
//     }
//    }
//   },
//   paths: {
//     sources: "./contracts",
//     tests: "./test",
//     cache: "./cache",
//     artifacts: "./artifacts"
//   },
//   mocha: {
//     timeout: 20000
//   }
// };

