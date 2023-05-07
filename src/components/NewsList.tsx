import React from 'react'
import NewsCard from "./newsCard/NewsCard";
import {useAppSelector} from "../redux/store";

const NewsList = () => {

  const news = useAppSelector((state) => state.news.news)
  const cards = [...news].sort((a, b) => {
    if (a.time < b.time) {
      return 1 
    }
    if (a.time > b.time) {
      return - 1
    }

    return 0 
  })

  return (
    <div>
      {
        cards.map((story) => (
          <NewsCard
            key={story.id}
            {...story}
          />
        ))
      }
    </div>
  )


}
export default NewsList;