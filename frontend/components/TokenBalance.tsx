import { type BaseError, useReadContract, useAccount } from 'wagmi'
import erc20ABI from "@/contracts/ERC20ABI.json";
import { formatEther } from 'viem';

export function TokenBalance() {
  const userAccount = useAccount();
  const tokenAddress = "0x8A99D529d60f854ff323d4fFE284cc647CbDA5C3";
  const tokenDecimals = 3;
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
  console.log("---balanceValue---", balanceValue);
  if (isPending) return <span>Loading...</span> 

  if (error) 
    return ( 
      <span> 
        0.0
      </span> 
    )

  return (
    <span>{(parseInt(balanceValue) / 10 ** tokenDecimals).toString()}</span>
  )
}