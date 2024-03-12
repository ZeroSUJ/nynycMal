import { expect } from "chai";
import { ethers, network } from "hardhat";
import { Contract } from "ethers";
import {address, abi} from "../frontend/contracts/Mining.json";


describe("Mining", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  let miningContract: Contract;

  describe("Deployment", function () {
    it("Deploying with owner address and token address", async function () {
      console.log(address);
      const contract = new ethers.Contract(address, abi, ethers.provider);
      console.log("contract address,", contract.target)
      miningContract = await ethers.getContractAt("Mining", address);
      console.log("address", miningContract.target);
      const value = ethers.parseEther("0.1");
      await miningContract.buyBones({value: value});
      const bone = await miningContract.getMyBones("0x66ab0d9605fb5D5c9f802deA199C38d93B1Ea8ab");
      const miner = await miningContract.getMyMiners("0x66ab0d9605fb5D5c9f802deA199C38d93B1Ea8ab");
      
      console.log("bone:", bone.toString());
      console.log("miner:", miner.toString());
    });

  });
});
