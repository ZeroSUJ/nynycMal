import { type BaseError, useReadContract, useAccount } from 'wagmi'
import {abi, address} from "@/contracts/Staking.json";
import { formatEther } from 'viem';

export function GetPositionById( Id: number) {
  const userAccount = useAccount();
  const { 
    data: position,
    error, 
    isPending 
  } = useReadContract({
    address: `0x${address}`,
    abi: abi,
    functionName: 'getPositionById',
    args: [ Id ],
  })
  const stakingData: any = position;
  console.log(userAccount.address);

  if (isPending) return <span>Loading...</span> 

  if (error) 
    return "No data."

  return (
    <span>{ stakingData }</span>
  )
}