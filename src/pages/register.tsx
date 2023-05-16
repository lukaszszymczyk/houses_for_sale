import {
  getAuth,
  createUserWithEmailAndPassword
} from "@firebase/auth";
import { FormProvider, useForm } from "react-hook-form";
import { FormInput } from "@/components/FormInput";
import { addUser } from "@/services/firebase/users";
import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import styles from './../styles/Register.module.css';

type RegisterFormValues = { email: string, password: string, name: string, surname: string }

export default function Register() {
  const auth = getAuth();
  const formMethods = useForm<RegisterFormValues>();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async ({email, password, name, surname}: RegisterFormValues) => {
    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const userId = await addUser({email, name, surname});
      if (!userId) throw new Error("Cannot add new user to database");
      toast.success('User registered successfully');
    } catch (err) {
      console.log(err);
      toast.error('Error while registering new user');
    } finally {
      setIsLoading(false);
    }
  }

  return (<>
    <FormProvider {...formMethods}>
      <form className={styles.registerForm} id="login" onSubmit={formMethods.handleSubmit(handleRegister)}>
        <FormInput id="email" name="Email" type="email"/>
        <FormInput id="password" name="Password" type="text"/>
        <FormInput id="name" name="Name" type="text"/>
        <FormInput id="surname" name="Surname" type="text"/>
        <button className={styles.registerFormElement} type="submit" disabled={isLoading}>{isLoading ? "Loading..." : "Register"}</button>
      </form>
    </FormProvider>
    <Toaster/>
  </>)
}
