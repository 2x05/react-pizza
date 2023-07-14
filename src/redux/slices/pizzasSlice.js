import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzas', async ({ url }) => {
  const { data } = await axios.get(url);
  return data;
});

const initialState = {
  items: [],
  status: 'loading',
  pageCount: 1,
};

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
    setPageCount(state, action) {
      state.pageCount = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload.data;
      state.pageCount = action.payload.pagecount;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
    },
  },
});

export const { setItems, setPageCount } = pizzasSlice.actions;

export default pizzasSlice.reducer;
