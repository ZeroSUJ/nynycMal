'use client'

import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { useWriteContract } from "wagmi";
import {
  abi as miningAbi,
  address as miningAddress,
} from "@/contracts/Mining.json";
import { showToast } from "@/helper/ToastNotify";
import { parseEther } from "viem/utils";

const Admin = () => {
  const {
    data: hash,
    isPending,
    error,
    writeContractAsync,
  } = useWriteContract();

  const _seedMarket = async () => {
    console.log("_seedMarket");
    try {
      const tx = await writeContractAsync({
        abi: miningAbi,
        address: `0x${miningAddress}`,
        functionName: "seedMarket",
        args: [],
      });
      console.log("tx:", tx);
    } catch (err) {
      console.log(err);
      showToast("error", "Transaction failed");
    }
  };

  const _setTradingState = async () => {
    console.log("_setTradingState");
    try {
      const tx = await writeContractAsync({
        abi: miningAbi,
        address: `0x${miningAddress}`,
        functionName: "setTradingState",
        args: [],
        value: parseEther(traState.toString()),
      });
      console.log("tx:", tx);
    } catch (err) {
      console.log(err);
      showToast("error", "Transaction failed");
    }
  };

  const [traState, setTraState] = useState(0);
  const handleChange = (value: string) => {
    setTraState(parseInt(value));
  }

  return (
    <main className="min-h-screen">
      <div className="realtive px-20 py-48 min-w-unit-sm">
        <div className="frosted-glass-lightsmoke border-0.5 border-slate-200 bg-slate-500/[.06] backdrop-brightness-40 shadow-2xl rounded-3xl md:rounded-xl py-12 px-24 mx-auto max-w-3xl">
          <div className="text-center md:text-5xl text-3xl mb-10">
            Admin Page
          </div>
          <div className="flex justify-center flex-col gap-10">
            <Button
              className="px-10"
              color="primary"
              variant="bordered"
              onClick={_seedMarket}
            >
              Seed Bones
            </Button>
            <div className="flex flex-row items-center justify-between">
              <Input
                className="w-80 h-12"
                value={traState.toString()}
                onChange={(e) => handleChange(e.target.value)}
                type="number"
                label="Trading State"
              />
              <Button
                className="px-10"
                color="primary"
                variant="bordered"
                onClick={_setTradingState}
              >
                Set Trading State
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Admin;