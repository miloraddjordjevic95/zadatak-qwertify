import { COLORS, STRINGS } from "@/constants";
import { AppDispatch } from "@/redux/store";
import { addUser } from "@/redux/userSlice";
import axios from "axios";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, useColorScheme, View } from "react-native";
import { useDispatch } from "react-redux";

function AddUserScreen(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const isDarkMode: boolean = useColorScheme() === "dark";

  async function handleAddUser(): Promise<void> {
    try {
      const response = await axios.post(`${STRINGS.apiBaseURL}/users`, {
        email,
        first_name: firstName,
        last_name: lastName,
      });
      const newUserId = response.data.id;
      const newUser = {
        id: newUserId,
        email,
        first_name: firstName,
        last_name: lastName,
        avatar: `https://reqres.in/img/faces/${newUserId}-image.jpg`,
      };
      if (response.status !== 201) throw new Error("Error adding user");
      dispatch(addUser(newUser));
      Alert.alert("Success", "User added successfully!");
      router.back();
    } catch (err: unknown) {
      if (err instanceof Error) {
        Alert.alert("Error", err.message);
      }
    }
  }

  return (
    <View style={isDarkMode ? styles.containerDarkMode : styles.containerLightMode}>
      <Text style={isDarkMode ? styles.titleDarkMode : styles.titleLightMode}>Add New User</Text>
      <TextInput
        placeholder="Email"
        placeholderTextColor={isDarkMode ? COLORS.white : COLORS.black}
        value={email}
        onChangeText={setEmail}
        style={isDarkMode ? styles.inputDarkMode : styles.inputLightMode}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="First Name"
        placeholderTextColor={isDarkMode ? COLORS.white : COLORS.black}
        value={firstName}
        onChangeText={setFirstName}
        style={isDarkMode ? styles.inputDarkMode : styles.inputLightMode}
      />
      <TextInput
        placeholder="Last Name"
        placeholderTextColor={isDarkMode ? COLORS.white : COLORS.black}
        value={lastName}
        onChangeText={setLastName}
        style={isDarkMode ? styles.inputDarkMode : styles.inputLightMode}
      />
      <View style={{ rowGap: 8 }}>
        <Button title="Add User" onPress={handleAddUser} />
        <Button title="Cancel" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerLightMode: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
    backgroundColor: COLORS.white,
  },
  containerDarkMode: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
    backgroundColor: COLORS.black,
  },
  inputLightMode: {
    backgroundColor: COLORS.gray.background.lightMode,
    color: COLORS.black,
    borderWidth: 1,
    borderColor: COLORS.white,
    padding: 10,
    marginBottom: 10,
  },
  inputDarkMode: {
    backgroundColor: COLORS.gray.background.darkMode,
    color: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.black,
    padding: 10,
    marginBottom: 10,
  },
  titleLightMode: {
    color: COLORS.black,
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  titleDarkMode: {
    color: COLORS.white,
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
});

export default AddUserScreen;
