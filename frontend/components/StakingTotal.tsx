import { type BaseError, useReadContract, useAccount } from 'wagmi'
import erc20ABI from "@/contracts/ERC20ABI.json";
import { address as tokenAddress } from "@/contracts/NYNYCTokenAddress.json";
import { formatEther } from 'viem';

export function StakingTotal() {
//   const tokenAddress = "0x8A99D529d60f854ff323d4fFE284cc647CbDA5C3";
  const tokenDecimals = 3;
  const { 
    data: totalStaked,
    error, 
    isPending 
  } = useReadContract({
    address: `0x${tokenAddress}`,
    abi: erc20ABI,
    functionName: 'totalStaked',
    args: [],
  })

  const totalBalanceValue: number = Number(totalStaked);
  if (isPending) return <span>Loading...</span> 

  if (error) 
    return ( 
      <span> 
        0.0
      </span> 
    )

  return (
    <span>{(totalBalanceValue / 10 ** tokenDecimals).toString()}</span>
  )
}