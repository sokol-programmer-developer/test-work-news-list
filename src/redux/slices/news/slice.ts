import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {commentsType, NewsSliceStateType, newsType} from "./types";

const initialState: NewsSliceStateType = {
  news: [],
  article: null,
  comments: [],
  newsLoading: true,

}


const slice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setNews(state, action: PayloadAction<newsType[]>) {
      sliceActions.resetNews();
      state.news = action.payload;
      state.newsLoading = false;
    },
    setArticle(state, action: PayloadAction<newsType>) {
      state.article = action.payload;
    },
    setComments(state, action: PayloadAction<commentsType>) {
      if (action.payload !== null) {
        state.comments = state.comments.filter((item) => item.id !== action.payload.id);
        state.comments = [...state.comments, action.payload];
      }
    },
    resetNews(state) {
      state.news = [];
      state.article = null;
      state.comments = [];
      state.newsLoading = true;
    },
  }
});

export const sliceActions = slice.actions;
export default slice.reducer;