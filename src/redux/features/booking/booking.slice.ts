import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TBookingStage = {
  service: string;
  slot: string;
  user: string;
  name: string;
  email: string;
};

const initialState: TBookingStage = {
  email: "",
  name: "",
  service: "",
  slot: "",
  user: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setBookingInfo(state, action: PayloadAction<Partial<TBookingStage>>) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setBookingInfo } = userSlice.actions;
export default userSlice.reducer;
