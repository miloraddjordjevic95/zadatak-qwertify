import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "@/redux/apiSlice";
import userReducer from "@/redux/userSlice";

const store = configureStore({
  reducer: {
    api: apiReducer,
    user: userReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export default store;
export { RootState, AppDispatch };
