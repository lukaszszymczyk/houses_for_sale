import { ProtectedPageWrapper } from "@/components/ProtectedPageWrapper";
import { FormInput } from "@/components/FormInput";
import { useForm, FormProvider, Message } from "react-hook-form";
import { addHouse } from "@/services/firebase/houses";
import { useState } from "react";
import { Header } from "@/components/Header";
import { House } from "@/types/House";
import Cookies from "js-cookie";
import { toast, Toaster } from "react-hot-toast";
import styles from "./../styles/AddHouse.module.css";

export type AddHouseFormValues = { fileList: FileList } & House;

export default function AddHouse() {
  const formMethods = useForm<AddHouseFormValues>();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (formValues: AddHouseFormValues) => {
    setIsLoading(true);
    try {
      const {fileList, ...rest} = formValues;
      await addHouse({...rest, image: fileList[0], userId: Cookies.get("userId")});
      toast.success('New house has been added successfully');
    } catch (err) {
      console.log(err);
      toast.error('Error while adding house add');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ProtectedPageWrapper>
      <Header className={styles.header}/>
      <div className={styles.addHousePage}>
        <FormProvider {...formMethods}>
          <form id="add-new-house-form" className={styles.formElement} onSubmit={formMethods.handleSubmit(onSubmit)}>
            <FormInput id="fileList" name="Photo" type="file"/>
            <FormInput id="title" name="Title" type="text"/>
            <FormInput id="description" name="Description" type="text"/>
            <FormInput id="localization" name="Localization" type="text"/>
            <FormInput id="phone" name="Phone number" type="phone"/>
            <FormInput id="email" name="Email" type="email"/>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}>{isLoading ? "Loading..." : "Add new house"}</button>
          </form>
        </FormProvider>
      </div>
      <Toaster/>
    </ProtectedPageWrapper>
  )
}
