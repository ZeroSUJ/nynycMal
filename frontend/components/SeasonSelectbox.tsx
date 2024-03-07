import React, { useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { seasons } from "@/lib/data/PromptData";

export default function Season(props: any) {

  const { season, setSeason } = props;

  return (
    <Select
      value={season}
      onChange={(e) => setSeason({ name: e.target.value })}
      items={seasons}
      defaultSelectedKeys={["Spring"]}
      label="Seasons"
      className="max-w-s"
      
    >
      {(season) => <SelectItem key={season.name} style={{ color: 'white' }}>{season && season.name}</SelectItem>}
    </Select >
  );
}
