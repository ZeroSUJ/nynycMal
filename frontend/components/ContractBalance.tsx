/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */

import { BaseError, useBalance } from 'wagmi';
import { formatEther } from 'viem';
import { address } from '@/contracts/Mining.json';

export default function () {
  const contractBalance = useBalance({
    address: `0x${address}`,
  });

  if (contractBalance?.isPending) return <span>Loading...</span> 
  console.log(contractBalance)

  if (contractBalance?.error) 
    return ( 
      <span> 
        Error: {(contractBalance?.error as BaseError).shortMessage || contractBalance?.error.message} 
      </span> 
    )  

  return (
    <span> {formatEther(contractBalance.data.value).substring(0,5)} </span>
  )
}