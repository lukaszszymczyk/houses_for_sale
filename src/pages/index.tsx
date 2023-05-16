import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "@firebase/auth";
import { ProtectedPageWrapper } from "@/components/ProtectedPageWrapper";
import { useRouter } from "next/router";
import { Header } from "@/components/Header";
import { HouseList } from "@/components/HouseList";
import { House } from "@/types/House";
import { loadHousesByUserId } from "@/services/firebase/houses";
import { GetServerSidePropsContext } from "next";
import { ADD_HOUSE_PATH } from "@/config/constant";
import styles from "../styles/Home.module.css";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const userId = context.req.cookies['userId'];
  if (!userId) return {props: {houses: []}};
  try {
    const houses = await loadHousesByUserId(userId);
    return {props: {houses: houses}}
  } catch (err) {
    console.log(err);
    return {props: {houses: []}}
  }
}

export default function Home({houses}: { houses: House[] }) {
  const [user] = useAuthState(getAuth());
  const router = useRouter();

  const handleClickNewHouse = () => {
    router.push(ADD_HOUSE_PATH);
  }

  return (
    <ProtectedPageWrapper>
      <div className={styles.homePage}>
        <Header className={styles.header}/>
        <button onClick={handleClickNewHouse} className={styles.buttonElement}>Add new House</button>
        <HouseList items={houses}/>
      </div>
    </ProtectedPageWrapper>
  )
}
