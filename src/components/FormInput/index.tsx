import React from "react";
import { RegisterOptions, useFormContext } from "react-hook-form";
import { validation } from "@/components/FormInput/validation";
import styles from './style.module.css';

export type FormInputType = "text" | "email" | "phone" | "file";

export interface FormInputProps {
  id: string;
  name: string;
  type: FormInputType;
  isRequired?: boolean;
}

interface ErrorMessage {
  message: string;
  type: string;
}

export function FormInput(props: FormInputProps): JSX.Element {
  const {id, name, type} = props;
  const {
    register,
    formState: {errors},
  } = useFormContext();

  const inputClass = type === "file" ? styles.fileSelectInput : "";

  return (
    <>
      <label htmlFor={id} className={styles.label}>{name}</label>
      <input
        className={`${
          styles.inputElement
        } ${inputClass}`}
        key={id}
        type={type}
        accept={type === "file" ? "image/*" : ""}
        {...register(id, validation(props) as RegisterOptions)}
      />
      {errors[id] && (
        <p className={styles.errorMessage}>{(errors[id] as ErrorMessage).message}</p>
      )}
    </>
  );
}
