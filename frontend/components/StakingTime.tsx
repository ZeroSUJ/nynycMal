import React, { useState } from "react";
import NumberInput from "./NumberInput";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { formatEther, parseEther } from "viem";
import { abi as stakingAbi, address as stakingAddress } from "@/contracts/Staking.json";
import bep20Abi from "@/contracts/BEP20ABI.json";
import {
    type BaseError,
    useWaitForTransactionReceipt,
    useWriteContract,
    useAccount,
} from "wagmi";
import { showToast } from "@/helper/ToastNotify";

export default function StakingTime(props: any) {
    const nynycTokenAddress = "0xb953bea4143A9cf15498a2D0b08674d4824E4ce8"
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [value, setValue] = useState<number>(0);

    const {
        data: hash,
        isPending,
        error,
        writeContractAsync,
    } = useWriteContract();
    const _stake = async () => {
        console.log("_stake", value, props.deadline, typeof (props.deadlineDays));
        await writeContractAsync({
            abi: bep20Abi,
            address: nynycTokenAddress,
            functionName: "approve",
            args: [`0x${stakingAddress}`, (value * 1e5).toString()],
        })
            .then((res) => {
                console.log("tx1:", res);
            })
            .catch((err) => {
                console.log("err:", err);;
                // setIsProcess(false);
                showToast("error", "Approve Transaction reverted");
                return;
            })
        await writeContractAsync({
            abi: stakingAbi,
            address: `0x${stakingAddress}`,
            functionName: "stakeNYNYC",
            args: [props.deadlineDays, value * 1e5]
        })
            .then((res) => {
                console.log("tx1:", res);
            })
            .catch((err) => {
                console.log("err:", err);
                // setIsProcess(false);
                showToast("error", "Transaction reverted");
                return;
            })
        //   console.log("tx:", tx);
        // } catch (err) {
        //   console.log(err);
        //   showToast("error", "Transaction failed");
        // }
    };

    return (
        <>
            <Button size="lg" onPress={onOpen} color={props.color}>
                <CurrencyDollarIcon />
                {props.deadline}</Button>
            <Modal
                backdrop="opaque"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Stake NYNYC</ModalHeader>
                            <ModalBody>
                                <NumberInput number={value} setNumber={setValue} />
                                <p className="flex justify-center">{props.profit}</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={_stake}>
                                    {props.name}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
