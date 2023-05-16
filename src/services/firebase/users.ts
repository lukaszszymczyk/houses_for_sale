import { addDoc, collection, getDocs } from "@firebase/firestore";
import { firestore } from "@/config/firebaseApp";
import { User } from "@/types/User";

const collectionUsers = collection(firestore, "/users");

export const addUser = async (userToAdd: User): Promise<string | null> => {
  const user = await getUserByEmail(userToAdd.email)
  if (user && user.id) {
    return user.id;
  }
  const result = await addDoc(collectionUsers, JSON.parse(JSON.stringify(userToAdd)));
  return result.id;
}

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const querySnapshot = await getDocs(collectionUsers);
  return querySnapshot.docs
    .map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      } as User;
    })
    .find(user => user.email === email) || null;
}
