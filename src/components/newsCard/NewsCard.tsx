import React from "react";
import {Link} from "react-router-dom";
import styles from "./styles.module.scss";
import { newsType } from "../../redux/slices/news/types";

const NewsCard = (props: newsType) => {

  const { title, score, by, time, descendants } = props
  const date = new Date(time * 1000).toLocaleString()

  return (
    <div>
      <Link
        to={`/item/${props.id}`}
        className={styles.link}
      >
        <div className={styles.annotate}>
          <span className={styles.by}>
            by {by}
          </span>
          <time>
            posted on {date}
          </time>
        </div>
        <div>
          <h2>
            {title}
          </h2>
          <div>
            <span>
              Rating: {score} |
            </span>
            {
              descendants
                ?
                (
                  <span>
                    Comments: {descendants}
                  </span>
                )
                :
                (
                  <span>
                    No comments
                  </span>
                )
            }
          </div>
        </div>
       
      </Link>
   </div>
  )



}


export default NewsCard;
