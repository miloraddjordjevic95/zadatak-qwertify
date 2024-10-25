import { COLORS } from "@/constants";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";

function AuthLayout(): JSX.Element {
  const isDarkMode: boolean = useColorScheme() === "dark";

  const headerStyle = {
    headerStyle: {
      backgroundColor: isDarkMode ? COLORS.black : COLORS.white,
    },
    headerTintColor: isDarkMode ? COLORS.white : COLORS.black,
  };

  return (
    <>
      <StatusBar
        animated={true}
        hidden={false}
        hideTransitionAnimation="slide"
        networkActivityIndicatorVisible={true}
        style="auto"
        translucent={false}
      />
      <Stack>
        <Stack.Screen
          name="sign-in/index"
          options={{
            headerTitle: "Sign In",
            headerTitleAlign: "center",
            headerShadowVisible: false,
            ...headerStyle,
          }}
        />
        <Stack.Screen
          name="sign-up/index"
          options={{
            headerTitle: "Sign Up",
            headerTitleAlign: "center",
            headerShadowVisible: false,
            ...headerStyle,
          }}
        />
      </Stack>
    </>
  );
}

export default AuthLayout;
