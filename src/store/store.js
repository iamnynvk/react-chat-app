import { configureStore } from "@reduxjs/toolkit";

// redux-persist
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

// Slice here
import userReducer from "./userSlice";
import userMessagesReducer from "./userMessagesSlice";

const persistConfig = {
  key: "root",
  storage,
};

const reducer = combineReducers({
  user: userReducer,
  userMessages: userMessagesReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
});

store.subscribe(() => {
  console.log("Update State ---", store.getState().user);
  console.log(
    "Update State message ---",
    store.getState().userMessages.userMessages
  );
});

const persistor = persistStore(store);
export { store, persistor };
