import { addDoc, collection, deleteDoc, doc, getDocs } from "@firebase/firestore";
import { firestore } from "@/config/firebaseApp";
import { House } from "@/types/House";
import { uploadImage } from "@/services/firebase/images";
import Cookies from "js-cookie";

export type AddHouseParams = { image: File } & House

const collectionHouses = collection(firestore, "/houses");

export const loadHousesByUserId = async (userId: string): Promise<House[]> => {
  const querySnapshot = await getDocs(collectionHouses);
  return querySnapshot.docs
    .map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      } as House;
    })
    .filter(house => house.userId === userId);
}

export const addHouse = async ({image, ...house}: AddHouseParams): Promise<string> => {
    const photoUrl = await uploadImage(image);
    const result = await addDoc(collectionHouses as any, {
      photoUrl: photoUrl,
      userId: Cookies.get('userId'),
      ...house
    });
    return result.id;
}

export const removeHouse = async (id: string) => {
  return deleteDoc(doc(firestore, "houses", id));
}
