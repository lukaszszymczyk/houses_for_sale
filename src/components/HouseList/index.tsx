import React, { useState } from "react";
import { HouseItem } from "../HouseItem";
import { House } from "@/types/House";
import { removeHouse } from "@/services/firebase/houses";

export interface HouseListProps {
  items: House[];
}

export const HouseList = ({items}: HouseListProps) => {
  const [houses, setHouses] = useState<House[]>(items);

  const handleRemoveHouse = async (id: string) => {
    try {
      await removeHouse(id);
      setHouses((prevState) => prevState.filter(house => house.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  return (<>
    {houses.map((house) => <HouseItem key={house.id} house={house} onRemoveHouse={handleRemoveHouse}/>)}
  </>)
}
