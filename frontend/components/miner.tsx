import React from "react";
import { User } from "@nextui-org/react";

export default function Miners(props: any) {
    return (
        <div className="flex items-center">
            <img
                alt="mining"
                loading="lazy"
                width="45"
                height="36"
                decoding="async"
                data-nimg="1"
                className="mr-1 h-10 w-[50px] lg:mr-4"
                src={props.url}
            />
            <h3 className="flex-grow text-lg lg:text-2xl">{props.name}</h3>
            <span className="ml-2 text-xl font-bold text-orange-500 lg:text-2xl">{props.number}</span>
            <span className="ml-2 text-xl font-bold lg:text-2xl">{props.unit}</span>
        </div>
    );
}
