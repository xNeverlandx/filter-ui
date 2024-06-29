import {combineReducers, configureStore} from '@reduxjs/toolkit';
import filterSlice from "./filterSlice";

const filterReducers: any = combineReducers({
  filter: filterSlice,
});

const store = configureStore({
  reducer: filterReducers,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;