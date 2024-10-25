import { CustomTextInput, Button } from "@/components";
import { COLORS, STRINGS } from "@/constants";
import { ISignUpFormValues } from "@/interfaces";
import { useRouter } from "expo-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { Platform, StyleSheet, Text, View, KeyboardAvoidingView, Alert, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

function SignUpScreen(): JSX.Element {
  const {
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting },
  } = useForm();
  const pwd = watch("password");
  const router = useRouter();
  const isDarkMode: boolean = useColorScheme() === "dark";

  const handleSignUp: SubmitHandler<ISignUpFormValues> = async ({ email, password }) => {
    try {
      const res = await axios.post(`${STRINGS.apiBaseURL}/register`, {
        email,
        password,
      });
      if (res.status !== 200) throw new Error("Sign Up Failed");
      Alert.alert("Thanks For Registering!", "Your registration has been successful.");
      router.replace("/sign-in");
    } catch (err: unknown) {
      if (err instanceof Error) {
        Alert.alert("Sign Up Error", err.message);
      }
    }
  };

  return (
    <SafeAreaView style={isDarkMode ? styles.containerDarkMode : styles.containerLightMode}>
      <View style={styles.titleAndDescriptionContainer}>
        <Text style={isDarkMode ? styles.titleDarkMode : styles.titleLightMode}>Join Us! 🙌</Text>
        <Text style={isDarkMode ? styles.descriptionDarkMode : styles.descriptionLightMode}>
          We need some little information about you.
        </Text>
      </View>
      <KeyboardAvoidingView
        style={styles.textInputContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        enabled={true}
        keyboardVerticalOffset={10}
      >
        <CustomTextInput
          showLabel={true}
          label="Email"
          control={control}
          name="email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/,
              message: "Email is invalid",
            },
          }}
          autoCapitalize="none"
          autoComplete="email"
          autoFocus={true}
          editable={true}
          inputMode="email"
          keyboardType="email-address"
          multiline={false}
          placeholder="Enter your email address..."
          readOnly={false}
          secureTextEntry={false}
          textContentType="emailAddress"
        />
        <CustomTextInput
          showLabel={true}
          label="Password"
          control={control}
          name="password"
          rules={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password should be at least 8 characters long",
            },
          }}
          autoCapitalize="none"
          autoComplete="new-password"
          autoFocus={false}
          editable={true}
          inputMode="text"
          keyboardType="default"
          multiline={false}
          placeholder="Enter your password..."
          readOnly={false}
          secureTextEntry={true}
          textContentType="password"
        />
        <CustomTextInput
          showLabel={true}
          label="Confirm Password"
          control={control}
          name="repeatPassword"
          rules={{
            required: "Confirm Password is required",
            validate: (value) => value === pwd || "Passwords do not match",
          }}
          autoCapitalize="none"
          autoComplete="new-password"
          autoFocus={false}
          editable={true}
          inputMode="text"
          keyboardType="default"
          multiline={false}
          placeholder="Repeat your password..."
          readOnly={false}
          secureTextEntry={true}
          textContentType="newPassword"
        />
        <Text style={isDarkMode ? styles.signInTextDarkMode : styles.signInTextLightMode}>
          Already have an account?{" "}
          <Text
            style={isDarkMode ? styles.signInLinkDarkMode : styles.signInLinkLightMode}
            onPress={() => router.push("/sign-in")}
          >
            Sign In
          </Text>
        </Text>
      </KeyboardAvoidingView>
      <KeyboardAvoidingView
        style={styles.buttonContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        enabled={true}
        keyboardVerticalOffset={10}
      >
        <Button onPress={handleSubmit(handleSignUp)} isLoading={isSubmitting}>
          Sign Up
        </Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerLightMode: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.white,
  },
  containerDarkMode: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.black,
  },
  titleAndDescriptionContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    rowGap: 16,
    width: "100%",
  },
  titleLightMode: {
    fontSize: 32,
    fontStyle: "normal",
    fontWeight: "700",
    textAlign: "center",
    color: COLORS.black,
  },
  titleDarkMode: {
    fontSize: 32,
    fontStyle: "normal",
    fontWeight: "700",
    textAlign: "center",
    color: COLORS.white,
  },
  descriptionLightMode: {
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
    textAlign: "center",
    color: COLORS.gray.text.lightMode,
  },
  descriptionDarkMode: {
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
    textAlign: "center",
    color: COLORS.gray.text.darkMode,
  },
  textInputContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    rowGap: 16,
    width: "100%",
  },
  signInTextLightMode: {
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
    textAlign: "center",
    color: COLORS.black,
  },
  signInTextDarkMode: {
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
    textAlign: "center",
    color: COLORS.white,
  },
  signInLinkLightMode: {
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "700",
    textAlign: "center",
    color: COLORS.blue.lightMode,
  },
  signInLinkDarkMode: {
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "700",
    textAlign: "center",
    color: COLORS.blue.darkMode,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SignUpScreen;
