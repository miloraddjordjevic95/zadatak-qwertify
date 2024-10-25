import { COLORS } from "@/constants";
import { IUserProps } from "@/interfaces";
import { useState } from "react";
import { Button, Image, Modal, Platform, StyleSheet, Text, TextInput, useColorScheme, View } from "react-native";

function User({ user, onDelete, onUpdate }: IUserProps): JSX.Element {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [email, setEmail] = useState(user.email);
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const isDarkMode: boolean = useColorScheme() === "dark";

  function handleUpdate(): void {
    onUpdate(user.id, { email: email, first_name: firstName, last_name: lastName });
    setIsModalVisible(false);
  }

  return (
    <View style={isDarkMode ? styles.containerDarkMode : styles.containerLightMode}>
      <View style={styles.userInfoContainer}>
        <View>
          <Image source={{ uri: user.avatar }} style={{ width: 48, height: 48, borderRadius: 999 }} />
        </View>
        <View style={{ rowGap: 4 }}>
          <Text style={isDarkMode ? styles.textDarkMode : styles.textLightMode}>
            {user.first_name} {user.last_name}
          </Text>
          <Text style={isDarkMode ? styles.textDarkMode : styles.textLightMode}>{user.email}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Update" onPress={() => setIsModalVisible(true)} />
        <Button title="Delete" onPress={() => onDelete(user.id)} color="red" />
      </View>
      <Modal visible={isModalVisible} animationType="slide" onRequestClose={() => setIsModalVisible(false)}>
        <View style={isDarkMode ? styles.modalContainerDarkMode : styles.modalContainerLightMode}>
          <Text style={{ color: isDarkMode ? COLORS.white : COLORS.black, marginBottom: 8 }}>Edit User</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor={isDarkMode ? COLORS.white : COLORS.black}
            style={isDarkMode ? styles.inputDarkMode : styles.inputLightMode}
          />
          <TextInput
            value={firstName}
            onChangeText={setFirstName}
            placeholder="First Name"
            placeholderTextColor={isDarkMode ? COLORS.white : COLORS.black}
            style={isDarkMode ? styles.inputDarkMode : styles.inputLightMode}
          />
          <TextInput
            value={lastName}
            onChangeText={setLastName}
            placeholder="Last Name"
            placeholderTextColor={isDarkMode ? COLORS.white : COLORS.black}
            style={isDarkMode ? styles.inputDarkMode : styles.inputLightMode}
          />
          <View style={{ rowGap: 8 }}>
            <Button title="Save Changes" onPress={handleUpdate} />
            <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  containerLightMode: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.black,
  },
  containerDarkMode: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.white,
  },
  userInfoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    columnGap: 16,
  },
  textLightMode: {
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "500",
    textAlign: "center",
    color: COLORS.black,
  },
  textDarkMode: {
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "500",
    textAlign: "center",
    color: COLORS.white,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    columnGap: Platform.OS === "ios" ? 4 : 8,
  },
  modalContainerLightMode: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: COLORS.white,
  },
  modalContainerDarkMode: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
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
});

export default User;
