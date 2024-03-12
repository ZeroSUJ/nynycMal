/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Content from "@/components/Content";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";
import {
  type BaseError,
  useWaitForTransactionReceipt,
  useWriteContract,
  useAccount,
} from "wagmi";

export type DataType = { building_name: string };
import { formatEther, parseEther } from "viem";
import Miners from "@/components/miner";
import TokenBalance from "@/components/TokenBalance";
import ContractBalance from "@/components/ContractBalance";
import WalletBalance from "@/components/WalletBalance";
import GetMiner from "@/components/GetMiner";
import GetRewards from "@/components/GetRewards";
import GetSpeed from "@/components/GetSpeed";

import erc20Abi from "@/contracts/ERC20ABI.json";
import {
  abi as miningAbi,
  address as miningAddress,
} from "@/contracts/Mining.json";
import { showToast } from "@/helper/ToastNotify";

const Mining = () => {
  const userAccount = useAccount();
  const { address, isConnected } = userAccount;
  // useEffect(()=>{
  //   console.log('updated state');
  // }, [isConnected]);

  const {
    data: hash,
    isPending,
    error,
    writeContractAsync,
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    isError: isFailed,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const [value, setValue] = useState<number>(0.01);

  // const handleMinusClick = () => {
  //   setValue((prevValue) => prevValue - 0.01);
  // };

  // const handlePlusClick = () => {
  //   setValue((prevValue) => prevValue + 0.01);
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue)) {
      setValue(newValue);
    }
  };

  const handleInputClick = () => {
    setValue(''); // Clear the input value when input box is clicked
  };
  const _collectRewards = async () => {
    console.log("_CollectRewards");
    try {
      const tx = await writeContractAsync({
        abi: miningAbi,
        address: miningAddress,
        functionName: "sellBones",
        args: [],
      });
      console.log("tx:", tx);
    } catch (err) {
      console.log(err);
      showToast("error", "Transaction failed");
    }
  };

  const _seedMarket = async () => {
    console.log("seed Market:");
    const tx = await writeContractAsync({
      abi: miningAbi,
      address: miningAddress,
      functionName: "seedMarket",
      args: [],
      value: parseEther("0.1"),
    });

    console.log("tx:", tx);
  };

  const _hireMiner = async () => {
    console.log("_hireMiner");
    try {
      const tx = await writeContractAsync({
        abi: miningAbi,
        address: miningAddress,
        functionName: "buyBones",
        args: [],
        value: parseEther(value.toString()),
      });
      console.log("tx:", tx);
    } catch (err) {
      console.log(err);
      showToast("error", "Transaction failed");
    }
  };

  if (isConfirmed) showToast("success", "transaction confirmed successfully.");
  if (isFailed) showToast("error", "transaction failed.");
  return (
    <div className="grid grid-cols-12 w-full h-screen bg-[#090808]">
      <Navbar />
      <Sidebar />
      <Content>
        <div className="flex justify-center">
          <h1 className="text-center text-3xl pt-6 pb-2">Mining BNB</h1>
        </div>
        <div className="flex flex-col gap-12  p-4  lg:flex-row">
          <div className="flex w-full flex-col gap-4 lg:w-1/2 rounded-md p-4">
            <Miners
              className="flex items-center py-1"
              name="Miners"
              url="https://www.minucoin.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fminer.233b0144.png&w=48&q=75"
              number={isConnected ? <GetMiner /> : "0"}
            />
            <Miners
              className="flex items-center py-1"
              name="Mining Speed"
              url="https://www.minucoin.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmining_speed.2ea3c80d.png&w=96&q=75"
              number={isConnected ? <GetSpeed /> : "0"}
              unit="BNB/48h"
            />
            <Miners
              className="flex items-center py-1"
              name="My rewards"
              url="https://www.minucoin.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Frewards.90435076.png&w=96&q=75"
              number={isConnected ? <GetRewards /> : "0"}
              unit="BNB"
            />
            <form className="flex flex-col lg:px-4">
              <div className="mt-8 flex items-center justify-between">
                <p className="text-lg lg:text-xl">
                  MIN:
                  <span>0.01 BNB</span>
                </p>
                <hr className="hidden w-1/3 opacity-40 lg:inline-block" />
                <p className="text-lg lg:text-xl">
                  MAX:
                  <span>20 BNB</span>
                </p>
              </div>
              <div className="mt-3 flex items-center justify-between rounded-lg border-neutral-400 bg-[#27272a] px-4 py-3">
                <input
                  className='w-full bg-transparent text-xl focus:outline-none'
                  type='number'
                  step='0.01'
                  min='0.01'
                  max='200'
                  pattern='\d+(\.\d{0,2})?'
                  value={value === 0 ? '' : value.toString()} // Display empty string if value is 0
                  onChange={handleChange}
                  onClick={handleInputClick} // Add onClick event to clear input value
                ></input>
                {/* <div className='flex gap-4'> */}
                {/* <img
                    alt="minus icon"
                    loading="lazy"
                    width="24"
                    height="24"
                    decoding="async"
                    data-nimg="1"
                    className="h-7 w-7 transform cursor-pointer opacity-60 transition-transform duration-300 hover:scale-110"
                    src="https://www.minucoin.com/_next/static/media/minus.35c39da3.svg"
                    onClick={handleMinusClick}
                  ></img>
                  <img
                    alt="plus icon"
                    loading="lazy"
                    width="24"
                    height="24"
                    decoding="async"
                    data-nimg="1"
                    className="h-7 w-7 transform cursor-pointer opacity-60 transition-transform duration-300 hover:scale-110"
                    src="https://www.minucoin.com/_next/static/media/plus.64cfad37.svg"
                    onClick={handlePlusClick}
                  ></img> */}
                {/* </div> */}
              </div>
              <p className="mt-3">ENTER BNB AMOUNT &amp; CLICK BUY BELOW</p>
              <div className="mt-3 flex flex-col gap-4 lg:flex-row pt-5">
                <Button
                  className="w-full rounded-md px-4 py-5"
                  color="primary"
                  variant="bordered"
                  type="button"
                  onClick={_hireMiner}
                  isDisabled={!isConnected || isConfirming || isPending}
                  isLoading={isConfirming}
                >
                  {isConfirming || isPending ? "Processing..." : "Hire Miners"}
                </Button>
                <Button
                  className="w-full rounded-md px-4 py-5"
                  color="primary"
                  variant="bordered"
                  type="button"
                  onClick={_collectRewards}
                  isDisabled={!isConnected || isConfirming || isPending}
                  isLoading={isConfirming}
                >
                  {isConfirming || isPending
                    ? "Processing..."
                    : "Collect Rewards"}
                </Button>
              </div>
            </form>
          </div>
          <div className="flex flex-col gap-6 py-4">
            <div className="flex items-center gap-3 rounded-md bg-neutral-700 p-4">
              <img
                alt="balances"
                loading="lazy"
                width="85"
                height="68"
                decoding="async"
                data-nimg="1"
                className="h-[68px] w-auto object-contain"
                style={{ color: "transparent" }}
                src="https://www.minucoin.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcontract_balance_desktop.dd6f8c11.png&w=96&q=75"
              ></img>
              <div className="flex flex-col divide-y-2">
                <p className="text-xl">
                  Token Balance: {isConnected ? <TokenBalance /> : "0"} BNB
                </p>
                <p className="text-xl">
                  Contract Balance: <ContractBalance /> BNB
                </p>
                <p className="text-xl">
                  Wallet Balance: {isConnected ? <WalletBalance /> : "0"} BNB
                </p>
              </div>
            </div>
            <hr className="mx-auto w-4/5 opacity-60"></hr>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 py-2">
                <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border-4 border-neutral-500 bg-neutral-700 ">
                  1
                </span>
                <p className="text-xl">
                  Hold $NYNYC in your wallet. At least 50000
                </p>
              </div>
              <div className="flex items-center gap-4 py-2">
                <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border-4 border-neutral-500 bg-neutral-700">
                  2
                </span>
                <p className="text-xl">Hire Miners using BNB.</p>
              </div>
              <div className="flex items-center gap-4 py-2">
                <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border-4 border-neutral-500 bg-neutral-700">
                  3
                </span>
                <p className="text-xl">
                  Click Collect Rewards to withdraw collected BNB.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 pt-8 pb-12">
          <div className="mt-3 rounded-xl border-2 border-neutral-400 bg-black px-3 py-6">
            <p className="text-center text-3xl uppercase">Profit: UP TO 5%</p>
            <p className="text-center mt-2 text-3xl uppercase">TAX: 2%</p>
          </div>
        </div>
      </Content>
    </div>
  );
};

export default Mining;
