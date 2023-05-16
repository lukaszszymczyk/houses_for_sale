import {
  FormInputProps,
  FormInputType,
} from "../FormInput";

const getPatternValue = (type: FormInputType) => {
  switch (type) {
    case "text":
      // uppercase and lowercase letters from a to z
      return /^[a-zA-Z]+$/;
    case "email":
      return /\S+@\S+\.\S+/;
    case "phone":
      // nine digits
      return /\d{9}/;
  }
};

export const validation = ({
                                  id,
                                  name,
                                  type,
                                  isRequired = true,
                                }: FormInputProps) => {
  return {
    required: {
      value: isRequired,
      message: `${name} is required`,
    },
    pattern: {
      value: getPatternValue(type),
      message: `Entered value does not match ${id} format`,
    },
  };
};
