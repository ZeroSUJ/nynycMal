import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // const token = await ethers.deployContract("Mining");
  // const token = await ethers.getContractFactory("Mining");
  // const tokenContract = await ethers.deploy("0x66ab0d9605fb5D5c9f802deA199C38d93B1Ea8ab", "0x0406dbBF7B62f79F8d889F30cC1F0E9191c404D4");

  // await ethers.getContractFactory("MMTTokenStake");
  const token = await ethers.getContractFactory("Mining");
  // const tokenInstance = await token.deploy('0x92f24CA795cD6cA6A78b980628045a85919A8E6D');
  const tokenInstance = await token.deploy("0x66ab0d9605fb5D5c9f802deA199C38d93B1Ea8ab", "0x0406dbBF7B62f79F8d889F30cC1F0E9191c404D4");

  console.log("Token address:", await tokenInstance.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });