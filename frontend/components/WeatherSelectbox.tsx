import React, { useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { weathers } from "@/lib/data/PromptData";

export default function Age(props: any) {

  const { weather, setWeather } = props;

  return (
    <Select
      value={weather}
      onChange={(e) => setWeather({ name: e.target.value })}
      items={weathers}
      label="Weathers"
      defaultSelectedKeys={["Clear blue sky with gentle breeze"]}
      className="max-w-s"
    >
      {(weather) => <SelectItem key={weather.name} style={{ color: 'white' }}>{weather && weather.name}</SelectItem>}
    </Select >
  );
}
