import * as SecureStore from "expo-secure-store";

// Set item
async function setItemAsync(key: string, value: string): Promise<void> {
  try {
    const jsonValue: string = JSON.stringify(value);
    await SecureStore.setItemAsync(key, jsonValue);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    }
  }
}

// Get item
async function getItemAsync(key: string): Promise<any> {
  try {
    const jsonValue: string | null = await SecureStore.getItemAsync(key);
    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    }
  }
}

// Delete item
async function deleteItemAsync(key: string): Promise<void> {
  await SecureStore.deleteItemAsync(key);
}

export { setItemAsync, getItemAsync, deleteItemAsync };
