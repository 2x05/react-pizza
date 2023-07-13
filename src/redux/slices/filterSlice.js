import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  sortType: 0,
  currentPage: 1,
  pageCount: 1,
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSortType(state, action) {
      state.sortType = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setPageCount(state, action) {
      state.pageCount = action.payload;
    },
    setFilters(state, action) {
      state.categoryId = Number(action.payload.category);
      state.sortType = Number(action.payload.sorttype);
      state.currentPage = Number(action.payload.pagenumber);
      state.pageCount = Number(action.payload.pagecount);
    },
  },
});

export const { setCategoryId, setSortType, setCurrentPage, setPageCount, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;