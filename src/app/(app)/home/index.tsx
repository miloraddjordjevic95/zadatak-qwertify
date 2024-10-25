import { User } from "@/components";
import { COLORS } from "@/constants";
import { IUser } from "@/interfaces";
import { useEffect } from "react";
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { deleteUser, fetchUsers, updateUser } from "@/redux/userSlice";

function HomeScreen(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { users, page, loading, hasMore } = useSelector((state: RootState) => state.user);
  const isDarkMode = useColorScheme() === "dark";

  useEffect(() => {
    dispatch(fetchUsers(page));
  }, [dispatch]);

  function handleLoadMore(): void {
    if (!loading && hasMore) {
      dispatch(fetchUsers(page));
    }
  }

  function handleDeleteUser(userId: number): void {
    Alert.alert("Confirm Deletion", `Are you sure you want to delete user with ID ${userId}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => dispatch(deleteUser(userId)),
      },
    ]);
  }

  function handleUpdateUser(
    userId: number,
    updatedData: { email: string; first_name: string; last_name: string },
  ): void {
    dispatch(updateUser({ userId, updatedData }));
  }

  return (
    <SafeAreaView style={isDarkMode ? styles.containerDarkMode : styles.containerLightMode}>
      {users.length === 0 ? (
        <View style={styles.noUsersContainer}>
          <Text style={isDarkMode ? styles.noUsersTextDarkMode : styles.noUsersTextLightMode}>
            The list is currently empty. Add some users to get started.
          </Text>
        </View>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }: { item: IUser }) => (
            <User key={item.id} user={item} onDelete={handleDeleteUser} onUpdate={handleUpdateUser} />
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loading ? (
              <ActivityIndicator
                animating={true}
                color={isDarkMode ? COLORS.white : COLORS.black}
                hidesWhenStopped={true}
                size="large"
              />
            ) : null
          }
        />
      )}
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
  noUsersContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noUsersTextLightMode: {
    fontSize: 16,
    fontStyle: "italic",
    fontWeight: "400",
    textAlign: "center",
    color: COLORS.gray.text.lightMode,
  },
  noUsersTextDarkMode: {
    fontSize: 16,
    fontStyle: "italic",
    fontWeight: "400",
    textAlign: "center",
    color: COLORS.gray.text.darkMode,
  },
});

export default HomeScreen;
