import React from "react";
import {FilterDto} from "../types";
import {createSlice, PayloadAction, createSelector} from '@reduxjs/toolkit';

interface FilterState {
  filters: Array<FilterDto>;
}

const initialState: FilterState = {
  filters: [],
}

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filtersLoaded: (state, action: PayloadAction<FilterDto[]>) => {
      state.filters = action.payload;
      console.log("Data:payload ", action.payload);
    },

    addNewFilter: (state, action: PayloadAction<FilterDto>) => {
      state.filters.push(action.payload);
    }
  },
});

export const filtersSelector = createSelector(
  (state: any) => state.filter.filters,
  (data) => data,
);

export const {
  filtersLoaded,
  addNewFilter
} = filterSlice.actions;

export const { actions } = filterSlice;

export default filterSlice.reducer;