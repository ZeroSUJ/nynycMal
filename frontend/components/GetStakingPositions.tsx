import { type BaseError, useReadContract, useAccount } from 'wagmi'
import {abi, address} from "@/contracts/Staking.json";
import { formatEther } from 'viem';

export function GetStakingPostions() {
  const userAccount = useAccount();
  const { 
    data: positions,
    error, 
    isPending 
  } = useReadContract({
    address: `0x${address}`,
    abi: abi,
    functionName: 'getPositionIdsForAddress',
    args: [userAccount.address],
  })
  let positionIds: number[] = [];
  if (positions && Array.isArray(positions)) {
    positionIds = positions.map((item: BigInt) => Number(item));
  }

  if (isPending) return <span>Loading...</span> 

  if (error) 
    return "No position."

  return (
    <span>{ positionIds.join(",") }</span>
  )
}

export default GetStakingPostions;