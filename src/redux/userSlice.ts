import { STRINGS } from "@/constants";
import { IInitialStateUser, IUser } from "@/interfaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialStateUser: IInitialStateUser = {
  users: [],
  page: 1,
  loading: false,
  hasMore: true,
};

export const fetchUsers = createAsyncThunk("user/fetchUsers", async (page: number, { getState, dispatch }) => {
  const response = await axios.get(`${STRINGS.apiBaseURL}/users?page=${page}`);
  return response.data.data;
});

export const addUser = createAsyncThunk("user/addUser", async (newUser: Omit<IUser, "id">) => {
  const response = await axios.post(`${STRINGS.apiBaseURL}/users`, newUser);
  return response.data;
});

export const deleteUser = createAsyncThunk("user/deleteUser", async (userId: number, { dispatch }) => {
  await axios.delete(`${STRINGS.apiBaseURL}/users/${userId}`);
  return userId;
});

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ userId, updatedData }: { userId: number; updatedData: Partial<IUser> }) => {
    await axios.put(`${STRINGS.apiBaseURL}/users/${userId}`, updatedData);
    return { userId, updatedData };
  },
);

const userSlice = createSlice({
  name: "user",
  initialState: initialStateUser,
  reducers: {
    resetUsers: (state) => {
      state.users = [];
      state.page = 1;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = [...state.users, ...action.payload];
        state.page += 1;
        state.hasMore = action.payload.length > 0;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.unshift(action.payload);
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const { userId, updatedData } = action.payload;
        const userIndex = state.users.findIndex((user) => user.id === userId);
        if (userIndex >= 0) {
          state.users[userIndex] = { ...state.users[userIndex], ...updatedData };
        }
      });
  },
});

export const { resetUsers } = userSlice.actions;
export default userSlice.reducer;
