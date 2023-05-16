import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "@firebase/auth";
import { useRouter } from "next/router";
import { LOGIN_PATH } from "@/config/constant";


export interface ProtectedPageWrapperProps {
  children: React.ReactNode;
}

export const ProtectedPageWrapper = ({children}: ProtectedPageWrapperProps) => {
  const auth = getAuth();
  const router = useRouter();

  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if(!loading && !user) router.push(LOGIN_PATH);
  }, [user, loading]);

  return (
    <>
      {children}
    </>
  )
}