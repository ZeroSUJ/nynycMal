import React from "react";
import { Card, CardHeader, CardBody, Spacer } from "@nextui-org/react";

export default function StatusCard(props: any) {
    return (
        <Card className="py-4 bg-[#27272a] w-full">
            <CardHeader className="pb-0 pt-2 px-4 flex-col justify-center">
                <p className="flex uppercase font-bold ">{props.name}</p>
            </CardHeader>
            <Spacer y={3} />
            <CardBody className="overflow-visible py-2 ml-6">
                <p className="text-large uppercase font-bold">{props.status}</p>
            </CardBody>
        </Card>
    );
}
