import {configureStore} from "@reduxjs/toolkit"
import newsSlice from "./slices/news/slice";
import {useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from 'react-redux'

export const store = configureStore({
  reducer: {
    news: newsSlice
  }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector:
TypedUseSelectorHook<RootState> = useSelector