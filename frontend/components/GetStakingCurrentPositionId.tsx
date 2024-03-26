import { type BaseError, useReadContract, useAccount } from 'wagmi'
import {abi, address} from "@/contracts/Staking.json";

export function GetStakingCurrentPositionId() {
  const userAccount = useAccount();
  const { 
    data: position,
    error, 
    isPending 
  } = useReadContract({
    address: `0x${address}`,
    abi: abi,
    functionName: 'currentPositionId',
    args: [],
  })
  const stakingData: number = Number(position);

  if (isPending) return <span>Loading...</span> 

  if (error) 
    return "No data."

  return (
    <span>{ stakingData }</span>
  )
}

export default GetStakingCurrentPositionId;