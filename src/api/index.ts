
const apiUrl: string = "https://hacker-news.firebaseio.com/v0";

const response = (res: resType) => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Error ${res.status}`)
}

export const getStoriesIds = async () => {
  return fetch (`${apiUrl}/newstories.json`).then(response)
}

export const getItemById = (id: number) => {
  return fetch(`${apiUrl}/item/${id}.json`).then(response)
}

type resType = {
  body: ReadableStream<Uint8Array> | null,
  bodyUsed: boolean,
  headers: Headers,
  ok: boolean,
  status: number,
  statusText: string,
  type: ResponseType,
  url: string,
  json(): Promise<any>;
}