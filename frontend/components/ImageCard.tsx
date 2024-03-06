import React from "react";
import { Card, CardFooter, Button, CardHeader, CardBody, Image } from "@nextui-org/react";
import { HeartIcon } from "@heroicons/react/24/outline";

export default function App(props: any) {

  const [liked, setLiked] = React.useState(false);

  return (
    <Card
      isFooterBlurred
      radius="lg"
      className="border-none"
    >
      <Image
        alt="Woman listing to music"
        className="object-cover"
        height={1000}
        width={1000}
        src={props.imgSrc}
      />
      <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <Button
          className="text-tiny text-white bg-black/20"
          isIconOnly
          radius="full"
          variant="light"
          onPress={() => setLiked((v) => !v)}
        >
          <HeartIcon
            className={liked ? "[&>path]:stroke-transparent" : ""}
            fill={liked ? "currentColor" : "none"}
          />
        </Button>
      </CardFooter>
    </Card>
  );
}
