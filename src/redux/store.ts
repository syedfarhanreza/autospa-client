import authReducer from "@/redux/features/auth/auth.slice";
import bookingReducer from "@/redux/features/booking/booking.slice";
import comparisonReducer from "@/redux/features/service/serviceComparison.slice";
import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { api } from "./api/api";
const persistConfig = {
  key: "root",
  storage,
};
const persistAuthReducer = persistReducer(
  { ...persistConfig, key: "auth" },
  authReducer
);
const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    comparison: comparisonReducer,
    auth: persistAuthReducer,
    booking: bookingReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
});
const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { persistor, store };
