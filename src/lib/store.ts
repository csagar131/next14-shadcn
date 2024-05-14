import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { sampleApi } from "./features/services/apiSlices/sample.api";
import { counterReducer } from "./features/counter";

const rootReducer = combineReducers({
  [sampleApi.reducerPath]: sampleApi.reducer,
  counter: counterReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: (gDM) =>
      gDM({ serializableCheck: false }).concat(sampleApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
