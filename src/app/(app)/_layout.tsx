import { COLORS } from "@/constants";
import { AppDispatch } from "@/redux/store";
import { clearToken } from "@/redux/apiSlice";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Alert, Button, useColorScheme } from "react-native";
import { useDispatch } from "react-redux";

function AppLayout(): JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const isDarkMode: boolean = useColorScheme() === "dark";

  const headerStyle = {
    headerStyle: {
      backgroundColor: isDarkMode ? COLORS.black : COLORS.white,
    },
    headerTintColor: isDarkMode ? COLORS.white : COLORS.black,
  };

  function handleSignOut() {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: () => {
            dispatch(clearToken());
            router.replace("/sign-in");
          },
        },
      ],
      { cancelable: true },
    );
  }

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
          name="home/index"
          options={{
            headerTitle: "Home",
            headerTitleAlign: "center",
            headerRight: () => <Button title="Add User" color="green" onPress={() => router.push("/add-user")} />,
            headerLeft: () => <Button title="Sign Out" color="red" onPress={handleSignOut} />,
            ...headerStyle,
          }}
        />
        <Stack.Screen
          name="add-user/index"
          options={{
            headerTitle: "Add User",
            presentation: "modal",
            ...headerStyle,
          }}
        />
      </Stack>
    </>
  );
}

export default AppLayout;
