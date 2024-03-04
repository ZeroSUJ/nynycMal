import React, { useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { environments } from "@/lib/data/PromptData";
export default function Environment(props: any) {

  const { environment, setEnvironment } = props;

  return (
    <Select
      value={environment}
      onChange={(e) => setEnvironment({ name: e.target.value })}
      items={environments}
      label="Environment"
      className="max-w-s"
    >
      {(environment) => <SelectItem key={environment.name} style={{ color: 'white', whiteSpace: 'normal' }}>{environment.name}</SelectItem>}
    </Select>
  );
}
