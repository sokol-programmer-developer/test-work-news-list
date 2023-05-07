export type newsType = {
    by: string,
    descendants: number,
    id: number,
    kids: Array<number>,
    score: number,
    time: number,
    title: string,
    type: string,
    url: string,
}

export type commentsType = {
    by: string,
    id: number,
    parent: number,
    text: string,
    time: number,
    type: string,
    kids?: Array<number>,
    deleted?: boolean
}

export interface NewsSliceStateType {
    news: newsType[],
    article: newsType | null,
    comments: commentsType[],
    newsLoading: boolean,
}