import { type BaseError, useReadContract, useAccount } from 'wagmi'
import erc20ABI from "@/contracts/ERC20ABI.json";
import { formatEther } from 'viem';

export function TokenBalance() {
  const userAccount = useAccount();
  const tokenAddress = "0x0406dbBF7B62f79F8d889F30cC1F0E9191c404D4";
  const { 
    data: balance,
    error, 
    isPending 
  } = useReadContract({
    address: tokenAddress,
    abi: erc20ABI,
    functionName: 'balanceOf',
    args: [userAccount.address],
  })
  const balanceValue: string | any = balance;

  if (isPending) return <span>Loading...</span> 

  if (error) 
    return ( 
      <span> 
        0.0
      </span> 
    )

  return (
    <span>{formatEther(balanceValue.toString())}</span>
  )
}