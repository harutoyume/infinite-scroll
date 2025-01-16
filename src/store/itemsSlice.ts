import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { IItem } from '../models/Item'

interface ItemsState {
  items: IItem[],
  isLoading: boolean,
  error: string,
  page: number,
}

interface editItemPayload {
  key: string;
  updatedItem: Partial<IItem>;
}

const initialState: ItemsState = {
  items: [],
  isLoading: false,
  error: '',
  page: 1,
}

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    editItem: (state, action: PayloadAction<editItemPayload>) => {
      const index = state.items.findIndex(item => item.key === action.payload.key)
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload.updatedItem }
      }
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.key !== action.payload)
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchItems.pending, (state) => { 
        state.isLoading = true; 
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = '';
        state.items = [...state.items, ...action.payload];
        state.page += 1;
      })
      .addCase(fetchItems.rejected, (state, action) => { 
        state.isLoading = false;
        state.error = action.error.message || 'Unknown error occured';
      })
  }
})

export const fetchItems = createAsyncThunk('items/fetchItems', async (page: number, thunkAPI) => {
    try {
      const response = await axios.get(`https://openlibrary.org/search.json?q=web+development&page=${page}&limit=10&sort=rating`);
      return response.data.docs;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  })

export const { editItem, deleteItem } = itemsSlice.actions
export default itemsSlice.reducer
