import React from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { buildings } from "@/lib/data/PromptData";

export default function Building(props: any) {

  const { building, setBuilding } = props;

  return (
    < Autocomplete
      value={building.name}
      onSelect={(e) => {
        setBuilding(e.currentTarget.value)
      }}
      label="Select a building"
      className="max-w py-3"
    >
      {buildings.map((building) => (
        <AutocompleteItem key={building.name} value={building.name}>
          {building.name}
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
}


