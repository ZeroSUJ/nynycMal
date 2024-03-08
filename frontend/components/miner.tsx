import React from "react";

export default function Miners(props: any) {
    return (
        <div className="flex items-center Card rounded-2xl bg-[#27272a] py-2 px-4">
            {/* <img
                alt="mining"
                loading="lazy"
                width="45"
                height="36"
                decoding="async"
                data-nimg="1"
                className="mr-1 h-10 w-[50px] lg:mr-4"
                src={props.url}
            /> */}
            <h3 className="flex-grow text-xl">{props.name}</h3>
            <span className="ml-2 text-xl text-blue-500">{props.number}</span>
            <span className="ml-2 text-xl">{props.unit}</span>
        </div>
    );
}
