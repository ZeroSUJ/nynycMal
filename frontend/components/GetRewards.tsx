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
    functionName: 'beanRewards',
    args: [userAccount.address],
  })
  console.log(userAccount.address);

  if (isPending) return <span>Loading...</span> 

  if (error) 
    return "0.0"

  return (
    <span>{formatEther(balance)}</span>
  )
}