import { Button, CustomTextInput } from "@/components";
import { COLORS, STRINGS } from "@/constants";
import { ISignInFormValues } from "@/interfaces";
import { useRouter } from "expo-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { Platform, StyleSheet, Text, View, KeyboardAvoidingView, Alert, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken } from "@/redux/apiSlice";
import { AppDispatch } from "@/redux/store";

function SignInScreen(): JSX.Element {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const isDarkMode: boolean = useColorScheme() === "dark";

  const handleSignIn: SubmitHandler<ISignInFormValues> = async ({ email, password }) => {
    try {
      const res = await axios.post(`${STRINGS.apiBaseURL}/login`, {
        email,
        password,
      });
      if (res.status !== 200) throw new Error("Sign In Failed");
      const token = res.data.token;
      dispatch(setToken(token));
      router.replace("/home");
    } catch (err: unknown) {
      if (err instanceof Error) {
        Alert.alert("Sign In Error", err.message);
      }
    }
  };

  return (
    <SafeAreaView style={isDarkMode ? styles.containerDarkMode : styles.containerLightMode}>
      <View style={styles.titleAndDescriptionContainer}>
        <Text style={isDarkMode ? styles.titleDarkMode : styles.titleLightMode}>Welcome Back! 👋</Text>
        <Text style={isDarkMode ? styles.descriptionDarkMode : styles.descriptionLightMode}>
          Please enter login details below.
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
          }}
          autoCapitalize="none"
          autoComplete="current-password"
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
        <Text style={isDarkMode ? styles.signUpTextDarkMode : styles.signUpTextLightMode}>
          Don't have an account?{" "}
          <Text
            style={isDarkMode ? styles.signUpLinkDarkMode : styles.signUpLinkLightMode}
            onPress={() => router.push("/sign-up")}
          >
            Sign Up
          </Text>
        </Text>
      </KeyboardAvoidingView>
      <KeyboardAvoidingView
        style={styles.buttonContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        enabled={true}
        keyboardVerticalOffset={10}
      >
        <Button onPress={handleSubmit(handleSignIn)} isLoading={isSubmitting}>
          Sign In
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
  signUpTextLightMode: {
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
    textAlign: "center",
    color: COLORS.black,
  },
  signUpTextDarkMode: {
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
    textAlign: "center",
    color: COLORS.white,
  },
  signUpLinkLightMode: {
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "700",
    textAlign: "center",
    color: COLORS.blue.lightMode,
  },
  signUpLinkDarkMode: {
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

export default SignInScreen;
