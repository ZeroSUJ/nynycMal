import {useAccount, useBalance } from 'wagmi';
import { formatEther } from 'viem';

export function WalletBalance() {
  const userAccount = useAccount();
  const contractBalance = useBalance({
    address: userAccount.address,
    token: "0xb953bea4143A9cf15498a2D0b08674d4824E4ce8"
  });

  if (contractBalance?.isPending) return <span>Loading...</span> 

  if (contractBalance?.error) 
    return ( 
      <span> 
        {/* Error: {(contractBalance?.error as BaseError).shortMessage || contractBalance?.error.message}  */}
        0.0
      </span> 
    )  

  return (
    <span> {(contractBalance.data.value / BigInt(1e5)).toString().substring(0,10)} </span>
  )
}

export default WalletBalance;