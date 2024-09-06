import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./features/userlist/userlist.slice";
import { asyncMiddleware } from "./middleware";

export const store = configureStore({
  reducer: userReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(asyncMiddleware);
  },
});
