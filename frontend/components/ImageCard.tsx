import React from "react";
import { Card, CardFooter, Button, CardHeader, CardBody, Image } from "@nextui-org/react";
import { HeartIcon } from "@heroicons/react/24/outline";

export default function App(props: any) {

  const [liked, setLiked] = React.useState(false);

  return (
    <Card>
      <Image
        alt="Woman listing to music"
        className="object-cover"
        height={1000}
        width={1000}
        src={props.imgSrc}
      />
      <div className="absolute z-10 pt-1 pl-1">
        <Button
          isIconOnly
          radius="full"
          variant="light"
          onPress={() => setLiked((v) => !v)}
        >
          <HeartIcon
            className={liked ? "[&>path]:stroke-transparent" : ""}
            fill={liked ? "currentColor" : "none"}
            height={30} // Keep the size of the HeartIcon here
            width={30} // Keep the size of the HeartIcon here
          />
        </Button>
      </div>
    </Card>
  );
}
