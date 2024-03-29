/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'
import dynamic from 'next/dynamic'
import { NewspaperIcon, PaperAirplaneIcon, BuildingLibraryIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { FaTelegram, FaDiscord, FaMailBulk, FaFacebook, FaTwitter } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Suspense, useState } from 'react'
import loadable from "@loadable/component";
import {
  useWaitForTransactionReceipt,
  useWriteContract,
  useAccount
} from "wagmi";

const Exchange = loadable(() => import("@/components/Exchange"));

export default function Home() {

  const userAccount = useAccount();
  const { address, isConnected } = userAccount;
  const NYNYC1 = "0x00913C6C8ae1458b3DD6Bb1010106Fc74a0a9C7C";
  const router = useRouter();

  return (
    <main className="min-h-screen">
      <div className="relative px-20 py-8 min-w-unit-sm">
        <div className="w-full flex justify-between items-center">
          <div className="hidden lg:block">
            <img src="./logo.png" className="min-w-[140px] w-28" />
          </div>
          <div className='flex flex-row gap-4 items-center'>
            <Link
              href="https://pancakeswap.finance/swap?outputCurrency=0x8A99D529d60f854ff323d4fFE284cc647CbDA5C3"
              className="min-w-54 btn glass-effect blue-effect btn-glow hidden lg:block "
              target='_blank'
            >
              Buy NYNYC
            </Link>
            <div className='hidden lg:block'>
              <w3m-button />
            </div>
          </div>
          <Dropdown>
            <DropdownTrigger>
              <Button
                className='flex justify-center lg:hidden border-white'
                variant="bordered"
              >
                <Bars3Icon className='h-8 w-8' />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions" className='w-32 lg:hidden'>
              <DropdownItem
                href='https://pancakeswap.finance/swap?outputCurrency=0x8A99D529d60f854ff323d4fFE284cc647CbDA5C3'
                className="text-center w-[120px] h-[32px] px-0 rounded-full blue-effect bg-red-500 hover:bg-red-700 "
                target="_blank"
              >
                <span className='font-bold'>
                  Buy NYNYC
                </span>
              </DropdownItem>
              <DropdownItem className='w-[120px] h-[32px] px-0 rounded-full'>
                <w3m-button />
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="relative flex justify-center items-center my-32 lg:mt-8">
          <img src="./home-bg.png" className="relative min-w-[394px] w-[394px] lg:w-[744px]" />
          <div className="w-[90%] m-auto flex flex-col items-center gap-4 md:gap-10 absolute transalte-y-1/2">
            <h1 className="font-medium text-center sm:text-center min-text-xl text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-loose text-white">
              HONESTY | TRANSPARENCY | SIMPLICITY | TRUST
            </h1>
            <h3 className="text-white min-text-xl md:text-4xl font-light">WE GROW TOGETHER</h3>
            <div className="w-32 h-1 my-2 mx-auto rounded-full  bg-gradient-to-r from-blue-400 via-pink-400 to-indigo-400"></div>
            <div className="flex flex-col md:flex-row">
              <Link
                href="/mint"
                className="min-w-54 btn glass-effect blue-effect btn-glow flex items-center"
              >
                <PaperAirplaneIcon className="h-8 w-8" />
                Go to Apps
              </Link>
              <Link
                href="https://res.cloudinary.com/dz6r3o4w0/image/upload/v1710260628/yamdavcortuef97381lf.pdf"
                target="_block"
                className="min-w-54 btn glass-effect blue-effect btn-glow flex items-center"
              >
                <NewspaperIcon className="h-8 w-8" />
                WhitePaper
              </Link>
            </div>
            {
              address == NYNYC1 && <div className='flex items-center'>
                <Link
                  href="./admin"
                  target="_blink"
                  className="min-w-54 btn glass-effect blue-effect btn-glow flex items-center"
                >
                  <BuildingLibraryIcon className="h-8 w-8" />
                  AdminPage
                </Link>
              </div>
            }
          </div>
        </div>
        <section className="relative flex justify-center items-center mb-32">
          <div className="flex flex-col gap-20 xl:flex-row">
            <div className=" xl:min-w-[450px] lg:min-w-[600px] lg:min-h-[300px] sm:min-w-[400px] sm:min-h-48 min-w-[300px] w-[300px] mx-auto blue-effect glass-effect rounded-xl flex flex-col justify-center items-center">
              <h1 className="text-2xl text-center p-5">
                Buy, Sell, and Swap Crypto
              </h1>
              <h1 className='text-3xl text-center p-5 text-gray-300'>
                Simple, Fast, Free of Custody
              </h1>
            </div>
            <div className='xl:min-w-[450px] lg:min-w-[600px] sm:min-w-[400px] min-w-[300px] w-[300px] mx-auto'>
              <Exchange fallback={<div>Loading...</div>} />
            </div>
          </div>
        </section>
        <section className="w-[80%] m-auto px-5">
          <div className="grid grid-cols-1 gap-8 justify-around xl:grid-cols-4 lg:grid-cols-3">
            <div className="flex flex-col text-center items-center xl:text-left xl:items-start">
              <h1 className="font-bold text-md">ABOUT</h1>
              <div className="w-20 h-0.5 my-3 rounded-full  bg-gradient-to-r from-blue-400 via-pink-400 to-indigo-400"></div>
              <div className='flex flex-col text-gray-400'>
                <Link className="text-md my-1 hover:text-white hover:underline" href="https://res.cloudinary.com/dz6r3o4w0/image/upload/v1710260628/yamdavcortuef97381lf.pdf" target="_block">WhitePaper</Link>
                <Link className="text-md my-1 hover:text-white hover:underline" href="/comingSoon" target="_block">Documentation</Link>
                <Link className="text-md my-1 hover:text-white hover:underline" href="/comingSoon" target="_block">CoinMarketCap</Link>
                <Link className="text-md my-1 hover:text-white hover:underline" href="/comingSoon" target="_block">CoinGecko</Link>
                <Link className="text-md my-1 hover:text-white hover:underline" href="/disclaimer" target="_block">Disclaimer</Link>
              </div>
            </div>
            <div className="flex flex-col text-center items-center xl:text-left xl:items-start">
              <h1 className="font-bold text-md">ECOSYSTEM</h1>
              <div className="w-20 h-0.5 my-3 rounded-full  bg-gradient-to-r from-blue-400 via-pink-400 to-indigo-400"></div>
              <div className='flex flex-col text-gray-400'>
                <Link className='text-md my-1 hover:text-white hover:underline' href='/mint'>NFT mint</Link>
                <Link className='text-md my-1 hover:text-white hover:underline' href="/mining">Mining BNB</Link>
                <Link className='text-md my-1 hover:text-white hover:underline' href="/comingSoon">Staking</Link>
                <Link className='text-md my-1 hover:text-white hover:underline' href="/comingSoon">Game</Link>
                <Link className='text-md my-1 hover:text-white hover:underline' href="/comingSoon">New NFT collection</Link>
              </div>
            </div>
            <div className="flex flex-col text-center items-center xl:text-left xl:items-start">
              <h1 className="font-bold text-md">SUPPORT</h1>
              <div className="w-20 h-0.5 my-3 rounded-full  bg-gradient-to-r from-blue-400 via-pink-400 to-indigo-400"></div>
              <div className='flex flex-col text-gray-400'>
                <Link className='text-md my-1 hover:text-white hover:underline' href="/comingSoon" target="_block">Getting Started</Link>
                <Link className='text-md my-1 hover:text-white hover:underline' href="/comingSoon" target="_block">FAQ</Link>
              </div>
            </div>
            <div className="col-span-full justify-self-center xl:col-span-1 xl:justify-self-start">
              <h1 className="text-left font-bold text-md hidden xl:block">COMMUNITY</h1>
              <div className="items-start w-20 h-0.5 my-3 rounded-full hidden xl:block bg-gradient-to-r from-blue-400 via-pink-400 to-indigo-400"></div>
              <div className='flex flex-col items-center sm:flex-row gap-10 xl:gap-1 xl:block'>
                <Link className="flex items-center gap-4 text-gray-400" href="mailto:nynyc@nynycoins.com" target="_block">
                  <div className="blue-effect glass-effect rounded-lg">
                    <FaMailBulk className="h-10 w-10 p-2" />
                  </div>
                  <h1 className="hidden xl:block hover:text-white hover:underline">Nynyc</h1>
                </Link>
                <Link className="flex items-center gap-4 text-gray-400" href="https://web.telegram.org/a/#-1002038937912" target="_block">
                  <div className="blue-effect glass-effect rounded-lg">
                    <FaTelegram className="h-10 w-10 p-2" />
                  </div>
                  <h1 className="hidden xl:block hover:text-white hover:underline">Telegram</h1>
                </Link>
                <Link className="flex items-center gap-4 text-gray-400" href="https://www.facebook.com/NYNYCoins" target="_block">
                  <div className="blue-effect glass-effect rounded-lg">
                    <FaFacebook className="h-10 w-10 p-2" />
                  </div>
                  <h1 className="hidden xl:block hover:text-white hover:underline">Facebook</h1>
                </Link>
                <Link className="flex items-center gap-4 text-gray-400" href="https://twitter.com/nynycoins" target="_block">
                  <div className="blue-effect glass-effect rounded-lg">
                    <FaTwitter className="h-10 w-10 p-2" />
                  </div>
                  <h1 className="hidden xl:block hover:text-white hover:underline">Twitter</h1>
                </Link>
                <Link className="flex items-center gap-4 text-gray-400" href="https://discord.com/channels/1193296401245950033/1193296401245950036" target="_block">
                  <div className="blue-effect glass-effect rounded-lg">
                    <FaDiscord className="h-10 w-10 p-2" />
                  </div>
                  <h1 className="hidden xl:block hover:text-white hover:underline">Discord</h1>
                </Link>
              </div>
            </div>
          </div>
          <div className='flex mx-auto my-20 text-2xl text-gray-400 justify-center'>
            <h1>@NYNYC - 2024. All Rights Reserved.</h1>
          </div>
        </section>
      </div>
    </main>
  );
}
