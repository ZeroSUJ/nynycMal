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
import { TokenBalance } from "@/components/TokenBalance";
import MiningContractBalance from "@/components/MiningContractBalance";
import { WalletBalance } from "@/components/WalletBalance";
import GetMiner from "@/components/GetMiner";
import { GetRewards } from "@/components/GetRewards";
import GetSpeed from "@/components/GetSpeed";

import {
  abi as miningAbi,
  address as miningAddress,
} from "@/contracts/Mining.json";
import { showToast } from "@/helper/ToastNotify";

const Mining = () => {
  const userAccount = useAccount();
  const { address, isConnected } = userAccount;
  const [step, setStep] = useState(0.01);
  const [bnb, setBnb] = useState("0.01");

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue)) {
      setValue(newValue);
    }
  };

  const handleInputClick = () => {
    setValue(0.0); // Clear the input value when input box is clicked
  };
  const _collectRewards = async () => {
    console.log("_CollectRewards");
    try {
      const tx = await writeContractAsync({
        abi: miningAbi,
        address: `0x${miningAddress}`,
        functionName: "sellBones",
        args: [],
      });
      console.log("tx:", tx);
    } catch (err) {
      console.log(err);
      showToast("error", "Transaction failed");
    }
  };

  const _hireMiner = async () => {
    console.log("_hireMiner");
    try {
      const tx = await writeContractAsync({
        abi: miningAbi,
        address: `0x${miningAddress}`,
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
          <div className="flex w-full flex-col gap-10 lg:w-1/2 rounded-md p-4">
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
            <form className="flex flex-col lg:px-4 gap-4">
              <div className="mt-8 flex items-center justify-between">
                <p className="text-lg lg:text-xl">
                  MIN:
                  <span>0.01 BNB</span>
                </p>
                <hr className="hidden w-1/3 opacity-40 lg:inline-block" />
                <p className="text-lg lg:text-xl">
                  MAX:
                  <span>100 BNB</span>
                </p>
              </div>
              <div className="flex justify-between items-center gap-1">
              <Input
                  color="default"
                  size="lg"
                  type="text" // Change type to text to allow decimal input
                  min={0.01}
                  max={100}
                  step={step}
                  onChange={e => {
                    const enteredValue = e.target.value;
                    // Check if the entered value is a valid number
                    if (/^\d*\.?\d*$/.test(enteredValue)) {
                      setBnb(enteredValue);
                    }
                  }}
                  onBlur={e => {
                    const parsedValue = parseFloat(bnb);
                    if (parsedValue < 0.01 || parsedValue > 100) {
                      alert("Input value must be between 0.01 and 100");
                      setBnb("0");
                    }
                  }}
                  value={bnb}
                />
              </div>
              <p className="mt-3">ENTER BNB AMOUNT &amp; CLICK HIRE MINERS</p>
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
                <Link
                  className="w-full"
                  href="https://bscscan.com/address/0x6b4C359711D0b6b70f2179f64B4741858Ef12B41"
                  target="_block"
                >
                  <Button
                    color="primary"
                    variant="bordered"
                    className="w-full rounded-md px-4 py-5"
                    type="button"
                  >
                    View to Smart Contract!
                  </Button>
                </Link>
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
                  Token Balance: {isConnected ? <TokenBalance /> : "0"} NYNYC
                </p>
                <p className="text-xl">
                  Contract Balance: <MiningContractBalance /> BNB
                </p>
                <p className="text-xl">
                  Wallet Balance: {isConnected ? <WalletBalance /> : "0"} BNB
                </p>
              </div>
            </div>
            <hr className="mx-auto w-4/5 opacity-60"></hr>
            <div className="flex flex-col gap-1">
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
              <div className="flex items-center gap-4 py-2">
                <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border-4 border-neutral-500 bg-neutral-700">
                  4
                </span>
                <p className="text-xl">
                  You can collect 4% rewards every two days.
                </p>
              </div>
              <div className="flex items-center gap-4 py-2">
                <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border-4 border-neutral-500 bg-neutral-700">
                  5
                </span>
                <p className="text-xl">
                  You can hire and compound miners using Hire Miners Button.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 pt-5 pb-12">
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
