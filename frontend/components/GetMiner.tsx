/* eslint-disable import/no-anonymous-default-export */
import { type BaseError, useReadContract, useAccount } from 'wagmi'
import {abi, address} from "@/contracts/Mining.json";
import { formatEther } from 'viem';

export default function () {
  const userAccount = useAccount();
  const { 
    data: balance,
    error, 
    isPending 
  } = useReadContract({
    address: `0x${address}`,
    abi: abi,
    functionName: 'getMyMiners',
    args: [userAccount.address],
  })
  const balanceValue: string | any = balance;

  if (isPending) return "Loading..."; 

  if (error) return '0';

  return formatEther(balanceValue);
}