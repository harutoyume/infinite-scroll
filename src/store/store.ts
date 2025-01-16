import { configureStore } from '@reduxjs/toolkit'
import reducer from './itemsSlice'

export const store = configureStore({
  reducer: {
    items: reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch