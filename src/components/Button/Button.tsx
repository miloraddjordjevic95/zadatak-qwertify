import { COLORS } from "@/constants";
import { IButtonProps } from "@/interfaces";
import { ActivityIndicator, Dimensions, Platform, Pressable, StyleSheet, Text, useColorScheme } from "react-native";

const { width } = Dimensions.get("window");

function Button({ onPress, isLoading, children }: IButtonProps): JSX.Element {
  const isDarkMode: boolean = useColorScheme() === "dark";

  return (
    <Pressable style={isDarkMode ? styles.containerDarkMode : styles.containerLightMode} onPress={onPress}>
      <Text style={styles.text}>
        {isLoading ? (
          <ActivityIndicator animating={true} color={COLORS.white} hidesWhenStopped={true} size="small" />
        ) : (
          children
        )}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  containerLightMode: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: width / 1.2,
    padding: 16,
    borderRadius: Platform.OS === "ios" ? 12 : 8,
    backgroundColor: COLORS.blue.lightMode,
  },
  containerDarkMode: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: width / 1.2,
    padding: 16,
    borderRadius: Platform.OS === "ios" ? 12 : 8,
    backgroundColor: COLORS.blue.darkMode,
  },
  text: {
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "700",
    textAlign: "center",
    color: COLORS.white,
  },
});

export default Button;
