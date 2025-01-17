import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { IBook } from '../models/Book'

export interface BooksState {
  books: IBook[],
  isLoading: boolean,
  error: string,
  page: number,
}

interface editBookPayload {
  key: string;
  updatedBook: Partial<IBook>;
}

const initialState: BooksState = {
  books: [],
  isLoading: false,
  error: '',
  page: 1,
}

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    editBook: (state, action: PayloadAction<editBookPayload>) => {
      const index = state.books.findIndex(book => book.key === action.payload.key)
      if (index !== -1) {
        state.books[index] = { ...state.books[index], ...action.payload.updatedBook }
      }
    },
    deleteBook: (state, action: PayloadAction<string>) => {
      state.books = state.books.filter(book => book.key !== action.payload)
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBooks.pending, (state) => { 
        state.isLoading = true; 
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = '';
        state.books = [...state.books, ...action.payload];
        state.page += 1;
      })
      .addCase(fetchBooks.rejected, (state, action) => { 
        state.isLoading = false;
        state.error = action.error.message || 'Unknown error occured';
      })
  }
})

export const fetchBooks = createAsyncThunk('books/fetchBooks', async (page: number, thunkAPI) => {
    try {
      const response = await axios.get(`https://openlibrary.org/search.json?q=web+development&page=${page}&limit=15&sort=rating`);
      return response.data.docs;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  })

export const { editBook, deleteBook } = booksSlice.actions
export default booksSlice.reducer
