import React from "react";
import { Card, CardFooter, Button, CardHeader, CardBody, Image } from "@nextui-org/react";
export default function App(props: any) {
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
    </Card>
  );
}
