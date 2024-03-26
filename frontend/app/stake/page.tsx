/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Content from "@/components/Content";
import StakingTime from "@/components/StakingTime";
import StatusCard from "@/components/StatusCard";
import ClaimReward from "@/components/ClaimReward";
import StakingTable from "@/components/StakingTable";
import NYNYCBalance from "@/components/NYNYCBalance";
import CurrentPositionId from "@/components/GetStakingCurrentPositionId";
import GetStakingPositions from "@/components/GetStakingPositions";
import { Tabs, Tab, Card, CardBody, Image, CardHeader, Spacer } from "@nextui-org/react";
import { CreditCardIcon } from "@heroicons/react/24/outline";
import {
    type BaseError,
    useWaitForTransactionReceipt,
    useWriteContract,
    useAccount,
} from "wagmi";

const Mining = () => {

    const [selected, setSelected] = useState("stake");
    const userAccount = useAccount();
    const { address, isConnected } = userAccount;

    const {
        data: hash,
        isPending,
        error,
        writeContractAsync,
    } = useWriteContract();

    const {
        isLoading: isConfirming,
        isSuccess: isConfirmed,
        isError: isFailed,
    } = useWaitForTransactionReceipt({
        hash,
    });

    const [number, setNumber] = useState(0);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '' || /^\d*$/.test(value)) {
            setNumber(value === '' ? 0 : parseInt(value));
        }
    };

    const walletBalance = NYNYCBalance();

    return (
        <div className="grid grid-cols-12 w-full h-screen bg-[#090808]">
            <Navbar />
            <Sidebar />
            <Content>
                <div className="flex justify-center">
                    <h1 className="text-center text-3xl pt-6 pb-2">NFT Stake</h1>
                </div>
                <div className="flex flex-col gap-12  p-4  lg:flex-row pb-12">
                    <div className="flex lg:w-1/2 flex-col w-full">
                        <Card className="bg-[#27272a]">
                            <CardHeader className="flex justify-center gap-4">
                                <Image
                                    alt="NYNYC logo"
                                    height={50}
                                    radius="sm"
                                    src="./logo.png"
                                    width={50}
                                />
                                <div className="flex flex-col">
                                    <p className="text-md">NYNYC Market</p>
                                </div>
                            </CardHeader>
                        </Card>
                        <Spacer y={10} />
                        <div className="flex w-full flex-col">
                            <Tabs
                                fullWidth
                                size="lg"
                                color="primary"
                                aria-label="Options"
                                selectedKey={selected}
                                onSelectionChange={(key) => setSelected(String(key))}
                            >
                                <Tab key="stake" title="Stake">
                                    <Card className="w-full bg-[#27272a]">
                                        <div className="flex items-center mt-6 ml-3">
                                            <CreditCardIcon width={15} height={15} />
                                            <p className="flex ml-2 mr-auto text-default-500 text-sm gap-2">Balance: {walletBalance}
                                                <Image
                                                    width={15}
                                                    height={15}
                                                    src="./logo.png">
                                                </Image>
                                                NYNYC
                                            </p>
                                        </div>
                                        <CardHeader
                                            className="flex justify-center p-8 gap-6">
                                            <div className="flex lg:w-1/2 flex-col w-full gap-6">
                                                <StakingTime color={"default"} deadline={"1 month"} deadlineDays={30} profit={"30 days @ 7% APY"} name={"Stake"} />
                                                <StakingTime color={"primary"} deadline={"3 month"} deadlineDays={90} profit={"90 days @ 10% APY"} name={"Stake"} />
                                            </div>
                                            <div className="flex lg:w-1/2 flex-col w-full gap-6">
                                                <StakingTime color={"secondary"} deadline={"6 month"} deadlineDays={180} profit={"180 days @ 12% APY"} name={"Stake"} />
                                                <StakingTime color={"warning"} deadline={"12 month"} deadlineDays={360} profit={"360 days @ 18% APY"} name={"Stake"} />
                                            </div>
                                        </CardHeader>
                                    </Card>
                                </Tab >
                            </Tabs>
                        </div>
                        <Spacer y={4} />
                        <Card className="bg-[#27272a] p-4">
                            <CardBody>
                                <div className="flex items-center">
                                    <p className="ml-2 mr-auto text-default-500">Total staked</p>
                                    <span className="m-2 text-xl">0 NYNYC</span>
                                </div>
                                <Spacer y={2} />
                                <div className="flex items-center">
                                    <p className="ml-2 mr-auto text-default-500">Pending Reward</p>
                                    <span className="m-2 text-xl">0 NYNYC</span>
                                </div>
                                <p className="text-sm text-default-500 ml-2 pb-3">You can claim reward when reward balance greater than 1 NYNYC</p>
                                <Spacer y={2} />
                                <ClaimReward className="w-full rounded-md px-4 py-6" />
                            </CardBody>
                        </Card>
                    </div>
                    <div className="flex flex-col lg:w-1/2  w-full">
                        <div className="flex flex-row w-full justify-between">
                            <StatusCard name={"Current Position ID"} status={CurrentPositionId()} />
                            <Spacer x={11} />
                            <StatusCard name={"Your position IDs"} status={GetStakingPositions()} />
                        </div>
                        <Spacer y={11} />
                        <div className="flex flex-row w-full justify-between">
                            <StatusCard name={"Total NYNYC Staked"} status={"XXX NYNYC"} />
                            <Spacer x={10} />
                            <StatusCard name={"Total Reward Earned"} status={"XXX NYNYC"} />
                        </div>
                        <Spacer y={10} />
                        <div>
                            <StakingTable />
                        </div>
                    </div>
                </div>
            </Content >
        </div >
    );
};

export default Mining;
