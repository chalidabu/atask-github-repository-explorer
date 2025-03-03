import { configureStore } from "@reduxjs/toolkit";
import githubReducer from '../features/githubSlice';

export const setupStore = () => {
  return configureStore({
    reducer: {
      github: githubReducer,
    },
  });
};

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];