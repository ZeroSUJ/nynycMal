import React, { useState, useRef } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { buildings } from "@/lib/data/PromptData";

export default function Building(props: any) {

  const { building, setBuilding } = props;

  return (
    <Autocomplete
      value={building}
      defaultSelectedKey={"Willow Heights Apartments"}
      onChange={(e) => setBuilding({ name: e.target.value })}
      items={buildings}
      label="Select a building"
      className="max-w py-3"

    >
      {(building) => <AutocompleteItem key={building.name} style={{ color: 'white' }}>{building && building.name}
      </AutocompleteItem>}
    </Autocomplete>
  );
}