'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import nftmAbi from '@/contracts/Marketplace.json';
import Content from '@/components/Content';
import ImageCard from '@/components/ImageCard';
import { Accordion, AccordionItem } from "@nextui-org/react";

import { FaEye, FaImage, FaImages } from "react-icons/fa";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
import { showToast } from '@/helper/ToastNotify';
import { type BaseError, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import Building from '@/components/Building';
import Age from '@/components/AgeSelectbox';
import Weather from '@/components/WeatherSelectbox';
import Environment from '@/components/EnvironmentSelectbox';
import Season from '@/components/SeasonSelectbox';
import { ages, weathers, seasons, environments, buildings } from '@/lib/data/PromptData';
import { Spinner } from '@nextui-org/react';
import { Avatar } from "@nextui-org/react";



export type DataType = { building_name: string; }
import { parseEther } from 'viem';
import erc20ABI from '@/contracts/ERC20ABI.json';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";
import Miners from '@/components/miner';





const Mining = () => {
  
  const [value, setValue] = useState(0.01);

  const handleMinusClick = () => {
    setValue((prevValue) => prevValue - 0.01);
  };
  const handlePlusClick = () => {
    setValue((prevValue) => prevValue + 0.01);
  };
  const handleChange = (e: any) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue)) {
      setValue(newValue);
    }
  };

  return (
    <div className="grid grid-cols-12 w-full h-screen bg-[#090808]">
      <Navbar />
      <Sidebar />
      <Content>
        <div className='flex flex-col gap-12  bg-neutral-800 p-4 lg:flex-row'>
          <div className='flex w-full flex-col gap-2 lg:w-3/5 rounded-md bg-neutral-700 p-4'>
            <Miners className='flex items-center' name="Miners" url="https://www.minucoin.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fminer.233b0144.png&w=48&q=75" number={0} />
            <Miners name="Mining Speed" url="https://www.minucoin.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmining_speed.2ea3c80d.png&w=96&q=75" number="0" unit="BNB/24h" />
            <Miners name="My rewards" url="https://www.minucoin.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Frewards.90435076.png&w=96&q=75" number="0.0000" unit="BNB" />
            <form className='flex flex-col lg:px-4'>
              <div className='mt-8 flex items-center justify-between'>
                <p className='text-lg lg:text-xl'>MIN:
                  <span className='font-bold'>0.01 BNB</span>
                </p>
                <hr className='hidden w-1/3 opacity-40 lg:inline-block' />
                <p className='text-lg lg:text-xl'>MAX:
                  <span className='font-bold'>20 BNB</span>
                </p>
              </div>
              <div className='mt-3 flex items-center justify-between rounded-lg border-2 border-neutral-400 bg-neutral-600 px-4 py-3'>
                <input
                  className='w-full bg-transparent text-xl font-bold focus:outline-none'
                  type='number'
                  step='0.01'
                  min='0.01'
                  max='200'
                  pattern='\d+(\.\d{0,2})?'
                  value={value}
                  onChange={handleChange}
                ></input>
                <div className='flex gap-4'>
                  <img
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
                  ></img>
                </div>
              </div>
              <p className="mt-3 font-bold">ENTER BNB AMOUNT &amp; CLICK BUY BELOW</p>
              <Button className="mt-8 rounded-md border transition-all duration-200 whitespace-nowrap border-transparent bg-white text-orange-500 hover:border-white hover:bg-transparent hover:text-white px-4 py-2 text-base" type="submit">Hire Miners</Button>
              <div className="mt-3 flex flex-col gap-3 lg:flex-row">
                <Button className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg w-full rounded-md px-4 py-2 text-base" type="button">Compound Miners</Button>
                <Button className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg w-full rounded-md px-4 py-2 text-base" type="button">Collect Rewards</Button>
              </div>
            </form>
            <div className="mt-3 rounded-xl bg-black p-4">
              <p className="text-2xl uppercase">Daily Profit: UP TO 4%</p>
              <p className="mt-2 text-2xl uppercase">TAX: 2%</p>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 rounded-md bg-neutral-700 p-4">
              <img alt="balances" loading="lazy" width="85" height="68" decoding="async" data-nimg="1" className="h-[68px] w-auto object-contain" style={{ color: 'transparent' }} src="https://www.minucoin.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcontract_balance_desktop.dd6f8c11.png&w=96&q=75"
              ></img>
              <div className="flex flex-col divide-y-2">
                <p className="font-bold">Contract Balance: ? BNB</p>
                <p className="font-bold">Wallet Balance: ? BNB</p></div>
            </div>
            <hr className="mx-auto w-4/5 opacity-60"></hr>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border-4 border-neutral-500 bg-neutral-700">1</span>
                <p className="font-semibold">Hold $NYNYC in your wallet.</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border-4 border-neutral-500 bg-neutral-700">2</span>
                <p className="font-semibold">Hire Miners using BNB.</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border-4 border-neutral-500 bg-neutral-700">3</span>
                <p className="font-semibold">You can compound miners using Compound Miners button.</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border-4 border-neutral-500 bg-neutral-700">4</span>
                <p className="font-semibold">Click Collect Rewards to withdraw collected BNB.</p></div></div>
          </div>
        </div>
        <div className=" bg-neutral-800 p-8">
          <div className="flex flex-col gap-6 rounded-md bg-neutral-700 p-4">
            <div className="grid place-items-center gap-3 rounded-xl bg-neutral-600 p-4 lg:flex lg:items-center">
              <p className="flex-shrink-0 text-center font-bold uppercase lg:flex-1 lg:text-left lg:text-2xl">Your Link:
                <span className="break-all text-orange-500">?</span>
              </p>
              <Button className="flex w-40 transform justify-center hover:scale-110 rounded-md border transition-all duration-200 whitespace-nowrap border-transparent bg-white text-orange-500 hover:border-white hover:bg-transparent hover:text-white px-4 py-2 text-base">Copy RefLink</Button>
            </div>
            <p className="text-center text-xl">
              <span className="font-bold">You Can Earn BNB Tokens</span> for inviting new users to join NYNYC. The NYNYC contract has a direct, one-level referral system
              <span className="font-bold">That Rewards Referrer</span>when invited users deposit and withdraw their tokens. Promote your referral link and
              <span className="font-bold"> Earn 12% Referral Rewards.</span></p></div></div>
      </Content>
    </div>
  );
};

export default Mining;