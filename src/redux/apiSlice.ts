import { IInitialStateAPI } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import { deleteItemAsync, getItemAsync, setItemAsync } from "@/utils";

const initialStateAPI: IInitialStateAPI = {
  token: null,
  isAuthenticated: false,
  isLoading: true,
};

const apiSlice = createSlice({
  name: "api",
  initialState: initialStateAPI,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      setItemAsync("userToken", action.payload);
    },
    clearToken: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      deleteItemAsync("userToken");
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setToken, clearToken, setLoading } = apiSlice.actions;

export const checkAuthState = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  const token = await getItemAsync("userToken");
  if (token) {
    dispatch(setToken(token));
  } else {
    dispatch(clearToken());
  }
};

export default apiSlice.reducer;
