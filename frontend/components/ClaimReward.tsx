import React from "react";
import { useState } from "react";
import NumberInput from "./NumberInput";
import { Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

export default function ClaimReward(props: any) {
    const [number, setNumber] = useState(0);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '' || /^\d*$/.test(value)) {
            setNumber(value === '' ? 0 : parseInt(value));
        }
    };

    return (
        <>
            <Button
                size="lg"
                onPress={onOpen}
                color="primary"
                variant="bordered">
                Claim Reward</Button>
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
                                <p >Please input your position ID</p>
                                <Input
                                    color="default"
                                    size="lg"
                                    type="text"
                                    step='1'
                                    min='0'
                                    max='200'
                                    pattern='\d+(\.\d{0,2})?'
                                    value={number === 0 ? '' : number.toString()}
                                    onChange={handleInputChange}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Claim Reward
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}