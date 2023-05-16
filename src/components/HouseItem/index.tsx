import React from "react";
import { House } from "../../types/House";
import styles from './styles.module.css';

export interface HouseProps {
  house: House;
  onRemoveHouse: (id: string) => void;
}

export const HouseItem = ({house, onRemoveHouse}: HouseProps) => {
  const {id, photoUrl, title, description, localization, phone, email} = house;

  const handleRemoveHouse = async () => {
    if (!id) return;
    await onRemoveHouse(id);
  }

  return (
    <div className={styles.houseItemElement}>
      <img src={photoUrl} alt="house" className={styles.image}/>
      <div className={styles.details}>
        <h3>{title}</h3>
        <p className={styles.description}>{description}</p>
        <p>Localization: {localization}</p>
        <p>Phone: {phone}</p>
        <p>Email: {email}</p>
      </div>
      <button className={styles.buttonRemove} onClick={handleRemoveHouse}>Delete</button>
    </div>
  )
}
