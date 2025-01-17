import { configureStore } from '@reduxjs/toolkit'
import reducer from './booksSlice'

export const store = configureStore({
  reducer: {
    books: reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch