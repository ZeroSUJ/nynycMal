import React, { useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { ages } from "@/lib/data/PromptData";

export default function Age(props: any) {

  const { age, setAge } = props;

  return (
    <Select
      value={age}
      onChange={(e) => setAge({ name: e.target.value })}
      defaultSelectedKeys={["In modern times"]}
      items={ages}
      label="Ages"
      className="max-w-s"
    >
      {(age) => <SelectItem className="fixed" key={age.name} style={{ color: 'white' }}>{age && age.name}</SelectItem>}
    </Select >
  );
}
