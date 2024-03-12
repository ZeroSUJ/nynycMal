import {useAccount, useBalance } from 'wagmi';
import { formatEther } from 'viem';

export function WalletBalance() {
  const userAccount = useAccount();
  const contractBalance = useBalance({
    address: userAccount.address,
  });

  if (contractBalance?.isPending) return <span>Loading...</span> 
  console.log(contractBalance)

  if (contractBalance?.error) 
    return ( 
      <span> 
        {/* Error: {(contractBalance?.error as BaseError).shortMessage || contractBalance?.error.message}  */}
        0.0
      </span> 
    )  

  return (
    <span> {formatEther(contractBalance.data.value).substring(0,5)} </span>
  )
}