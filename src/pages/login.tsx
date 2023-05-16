import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithEmailAndPassword,
  onAuthStateChanged, FacebookAuthProvider, AuthProvider
} from "@firebase/auth";
import { useRouter } from "next/router";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { FormInput } from "@/components/FormInput";
import { addUser, getUserByEmail } from "@/services/firebase/users";
import { useState } from "react";
import { HOME_PAGE_PATH } from "@/config/constant";
import Cookies from "js-cookie";
import { toast, Toaster } from "react-hot-toast";
import styles from "./../styles/Login.module.css";

const authProvider = {
  google: new GoogleAuthProvider(),
  github: new GithubAuthProvider(),
  facebook: new FacebookAuthProvider(),
}

type AuthProviderType = "google" | "github" | "facebook";

export type LoginFormValues = { email: string, password: string }

export default function Login() {
  const router = useRouter();
  const auth = getAuth();
  const formMethods = useForm<LoginFormValues>();
  const [isLoading, setIsLoading] = useState(false);

  const loginWithExternalProvider = async (authProviderType: AuthProviderType) => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, authProvider[authProviderType]);
      const [name, surname] = result.user.displayName?.split(" ") || ["", ""];
      const userId = await addUser({
        email: result.user.email || "",
        name,
        surname,
      })
      if (!userId) throw new Error("Cannot add user to database");
      Cookies.set('userId', userId);
      toast.success('User logged successfully');
    } catch (error) {
      console.log(`Sign in error: ${error}`);
      toast.error('Error while signing in with an external provider');
    } finally {
      setIsLoading(false);
    }
  }

  const handleLogin = async ({email, password}: LoginFormValues) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = await getUserByEmail(email);
      Cookies.set("userId", user?.id || "");
      toast.success('User logged successfully');
    } catch (err) {
      console.log(err);
      toast.error('Error while signing in');
    } finally {
      setIsLoading(false);
    }
  }

  onAuthStateChanged(auth, (user) => {
    if (user) router.push(HOME_PAGE_PATH);
  })

  return (<>
    <FormProvider {...formMethods}>
      <form className={styles.loginForm} id="login" onSubmit={formMethods.handleSubmit(handleLogin)}>
        <FormInput id="email" name="Email" type="email"/>
        <FormInput id="password" name="Password" type="text"/>
        <button className={styles.loginFormElement} type="submit" disabled={isLoading}>{isLoading ? "Loading..." : "Login"}</button>
      </form>
    </FormProvider>
    <button className={styles.loginFormElement} onClick={() => loginWithExternalProvider("facebook")}>Login with Facebook</button>
    <button className={styles.loginFormElement} onClick={() => loginWithExternalProvider("google")}>Login with Google</button>
    <button className={styles.loginFormElement} onClick={() => loginWithExternalProvider("github")}>Login with Github</button>
    <Link href="/register" legacyBehavior>
      <a className={styles.loginFormElement} >Register new user</a>
    </Link>
    <Toaster/>
  </>)
}
