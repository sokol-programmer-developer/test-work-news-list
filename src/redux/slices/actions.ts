import { sliceActions } from "./news/slice";
import { getStoriesIds, getItemById } from "../../api";
import {Dispatch} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {commentsType} from "./news/types";

export const getNews = () => {
  return async (dispatch: Dispatch) => {
    try {
      const newsIds: Array<number> = await getStoriesIds()
      const newsIdsSlice = newsIds.slice(0, 100)
      const data = await Promise.all(
        newsIdsSlice.map((id) => getItemById(id) )
      )
      dispatch(sliceActions.setNews(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const getArticle = (id: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const article = await getItemById(id)
      dispatch(sliceActions.setArticle(article))
    } catch (error) {
      console.log(error)
    }
  }
}

export const getComments = () => {
  return async (dispatch: Dispatch, getState:() => RootState) => {
    try {
      const kidsIds:Array<number> = getState().news.article?.kids?? [];
      const data = await Promise.all(
        kidsIds.map((id) => getItemById(id))
      );
      data.forEach((item:commentsType) => dispatch(sliceActions.setComments(item)));
    } catch (error) {
      console.log(error)
    }
  };
};

export const updateComments = () => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      const comments: commentsType[] = getState().news.comments
      const data = await Promise.all(
        comments.map((comment) => getItemById(comment.id))        
      )
      const kidsIds = data.map((comment) => comment.kids)
      const newData = await Promise.all(
        kidsIds.map((id) => getItemById(id))
      )
      newData.forEach((item:commentsType) => dispatch(sliceActions.setComments(item)))

    } catch (error) {
      console.log(error)
    }
  }
}

export const getCommentsByIds = (ids: Array<number>) => {
  return async (dispatch: Dispatch) => {
    try {
      const data = await Promise.all(
        ids.map((id) => getItemById(id))
      )
      data.forEach((item:commentsType) => dispatch(sliceActions.setComments(item)))
    } catch (error) {
      console.log(error)  
    }
  }
}