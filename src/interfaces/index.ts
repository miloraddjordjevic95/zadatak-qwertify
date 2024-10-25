import { ReactNode } from "react";
import { Control, InputValidationRules } from "react-hook-form";
import { GestureResponderEvent } from "react-native";

// Interface IColors
interface IColors {
  white: string;
  black: string;
  gray: {
    text: {
      lightMode: string;
      darkMode: string;
    };
    background: {
      lightMode: string;
      darkMode: string;
    };
  };
  blue: {
    lightMode: string;
    darkMode: string;
  };
}

// Interface IStrings
interface IStrings {
  apiBaseURL: string;
}

// Interface ICustomTextInputProps
interface ICustomTextInputProps {
  showLabel: boolean;
  label: string;
  control: Control;
  name: "email" | "password" | "repeatPassword";
  rules: InputValidationRules;
  autoCapitalize: "characters" | "words" | "sentences" | "none";
  autoComplete: "current-password" | "email" | "family-name" | "given-name" | "new-password" | "off";
  autoFocus: boolean;
  editable: boolean;
  inputMode: "none" | "text" | "email";
  keyboardType: "default" | "email-address";
  multiline: boolean;
  placeholder: string;
  readOnly: boolean;
  secureTextEntry: boolean;
  textContentType: "none" | "emailAddress" | "familyName" | "givenName" | "newPassword" | "password";
}

// Interface IButtonProps
interface IButtonProps {
  onPress(e?: GestureResponderEvent): void;
  isLoading: boolean;
  children: ReactNode;
}

// Interface IInitialStateAPI
interface IInitialStateAPI {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Interface IInitialStateUser
interface IInitialStateUser {
  users: IUser[];
  page: number;
  loading: boolean;
  hasMore: boolean;
}

// Interface ISignInFormValues
interface ISignInFormValues {
  email: string;
  password: string;
}

// Interface ISignUpFormValues
interface ISignUpFormValues {
  email: string;
  password: string;
  repeatPassword: string;
}

// Interface IUser
interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

// Interface IUserProps
interface IUserProps {
  user: IUser;
  onDelete(id: number): void;
  onUpdate(id: number, updatedData: { email: string; first_name: string; last_name: string }): void;
}

export {
  IColors,
  IStrings,
  ICustomTextInputProps,
  IButtonProps,
  IInitialStateAPI,
  IInitialStateUser,
  ISignInFormValues,
  ISignUpFormValues,
  IUser,
  IUserProps,
};
