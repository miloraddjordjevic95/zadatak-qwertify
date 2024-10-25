import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import store from "@/redux/store";

function RootLayout(): JSX.Element {
  return (
    <Provider store={store}>
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
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(app)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </Provider>
  );
}

export default RootLayout;
