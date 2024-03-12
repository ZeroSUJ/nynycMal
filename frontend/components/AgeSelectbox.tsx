import React, { useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { ages } from "@/lib/data/PromptData";

export default function Age(props: any) {

  const { age, setAge } = props;

  return (
    <Select
      value={age}
      onChange={(e) => setAge({ name: e.target.value })}
      defaultSelectedKeys={["In 1900s"]}
      items={ages}
      defaultSelectedKeys={["In modern times"]}
      label="Ages"
      className="max-w-s"
    >
      {(age) => <SelectItem key={age.name} style={{ color: 'white' }}>{age && age.name}</SelectItem>}
    </Select >
  );
}
