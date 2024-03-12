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
    address: address,
    abi: abi,
    functionName: 'getMyMiners',
    args: [userAccount.address],
  })

  if (isPending) return "Loading..."; 


  return formatEther(balance);
}