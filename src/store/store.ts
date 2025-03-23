import { configureStore } from '@reduxjs/toolkit';
import reduserProgress from './progressSlics';

export const store = () => {
  return configureStore({
    reducer: {
      reduserProgress,
    },
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
