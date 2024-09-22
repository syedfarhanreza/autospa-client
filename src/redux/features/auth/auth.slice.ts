import { TUser } from "@/types/user";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TAuthState = {
  user: TUser | null;
  isLoading: boolean;
  token: string | null;
};
const initialState: TAuthState = {
  user: null,
  isLoading: true,
  token: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ user: TUser | null }>) {
      state.user = action.payload.user;

      state.isLoading = false;
    },
    logout() {
      return { user: null, isLoading: false, token: null };
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action?.payload || false;
    },
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },
    setState(state, action: PayloadAction<TAuthState>) {
      return action.payload;
    },
  },
});

export const { setUser, logout, setLoading, setToken, setState } =
  userSlice.actions;
export default userSlice.reducer;
