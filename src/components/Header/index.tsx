import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "@firebase/auth";
import Cookies from "js-cookie";
import styles from "./styles.module.css";

export interface HeaderProps {
  className?: string
}

export const Header = ({className}: HeaderProps) => {
  const auth = getAuth();
  const [loading] = useAuthState(auth);

  const signOut = async () => {
    try {
      await auth.signOut();
      Cookies.set('userId', '');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <header className={className}>
      <button className={styles.signOutButton} onClick={signOut} disabled={false}>Sign Out</button>
    </header>
  )
}