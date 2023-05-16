import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { v4 } from "uuid";
import { uploadBytes } from "@firebase/storage";

export const uploadImage = async (image: File): Promise<string> => {
  const storage = getStorage();
  const photoPath = `images/${image.name + v4()}`;
  await uploadBytes(ref(storage, photoPath), image);
  return await getDownloadURL(ref(storage, photoPath));
}
