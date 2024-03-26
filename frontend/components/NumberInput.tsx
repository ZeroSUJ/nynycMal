import { Dispatch, useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/outline";

export default function NumberInput( {number, setNumber}:{number: number, setNumber:any} ) {
    // const [number, setNumber] = useState(0);

    const handlePlusClick = () => {
        setNumber(number + 1);
    };

    const handleMinusClick = () => {
        setNumber(number - 1);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '' || /^\d*$/.test(value)) {
            setNumber(value === '' ? 0 : parseInt(value));
        }
    };

    return (
        <div className="flex justify-between items-center gap-1">
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
            <Button onClick={handlePlusClick}>
                <PlusCircleIcon />
            </Button>
            <Button onClick={handleMinusClick}>
                <MinusCircleIcon />
            </Button>
        </div>
    )
}