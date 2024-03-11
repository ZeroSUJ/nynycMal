import React from "react";
import { Card, CardFooter, Button, CardHeader, CardBody, Image } from "@nextui-org/react";
import { CheckIcon } from "@heroicons/react/24/outline";

export default function App(props: any) {

  const { selectedList, setSelectedList, id, imgSrc } = props;

  function handleClick() {
    if (selectedList?.find((it: number) => it === id)) {
      setSelectedList(selectedList?.filter((it: number) => it !== id));
    } else {
      setSelectedList([...selectedList, id]);
    }
    console.log(selectedList)
  }

  return (
    <Card>
      <Image
        alt="Woman listing to music"
        className="object-cover"
        height={1000}
        width={1000}
        src={imgSrc}
      />
      <div className="absolute z-10 pt-1 pl-1">
        <Button
          isIconOnly
          radius="full"
          variant="light"
          onClick={() => handleClick()}
        >
          <CheckIcon
            className={selectedList?.find((it: number) => it === id) ? "[&>path]:stroke-transparent" : ""}
            fill={selectedList?.find((it: number) => it === id) ? "currentColor" : "none"}
            height={30} // Keep the size of the HeartIcon here
            width={30} // Keep the size of the HeartIcon here
          />
        </Button>
      </div>
    </Card>
  );
}
