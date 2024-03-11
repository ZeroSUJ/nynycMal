  import { HardhatRuntimeEnvironment } from "hardhat/types";
  import { DeployFunction } from "hardhat-deploy/types";
  import fs from "fs";
  
  /**
   * Deploys a contract named "YourContract" using the deployer account and
   * constructor arguments set to the deployer address
   *
   * @param hre HardhatRuntimeEnvironment object.
   */
  const deployMining: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    /*
      On localhost, the deployer account is the one that comes with Hardhat, which is already funded.
  
      When deploying to live networks (e.g `yarn deploy --network goerli`), the deployer account
      should have sufficient balance to pay for the gas fees for contract creation.
  
      You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
      with a random private key in the .env file (then used on hardhat.config.ts)
      You can run the `yarn account` command to check your balance in every network.
    */
    const { deployer } = await hre.getNamedAccounts();
    const { deploy, get } = hre.deployments;
  
    await deploy("Mining", {
      from: deployer,
      // Contract constructor arguments
      args: ["0x66ab0d9605fb5D5c9f802deA199C38d93B1Ea8ab", "0x0406dbBF7B62f79F8d889F30cC1F0E9191c404D4"],
      log: true,
      // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
      // automatically mining the contract deployment transaction. There is no effect on live networks.
      autoMine: true,
    });

    const Mining = await get("Mining");

    const data = {
      address: Mining.address,
      abi: Mining.abi
    }
    console.log(Mining.address);
  
    //This writes the ABI and address to the marketplace.json
    //This data is then used by frontend files to connect with the smart contract
    fs.writeFileSync('./frontend/contracts/Mining.json', JSON.stringify(data))
  };
  
  export default deployMining;
  
  deployMining.tags = ["Mining"];