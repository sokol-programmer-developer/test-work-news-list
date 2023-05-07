import React, {useCallback, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {getArticle, getComments, getCommentsByIds, updateComments} from "../../redux/slices/actions";
import styles from "./styles.module.scss";
import {sliceActions} from "../../redux/slices/news/slice";
import CommentsList from "../../components/commentsList/CommentsList";
import {newsType} from "../../redux/slices/news/types";
import {useAppDispatch, useAppSelector} from "../../redux/store";


const News = () => {
  const dispatch = useAppDispatch()

  const { id } = useParams()

  const news = useAppSelector((state) => state.news.news)
  const article = useAppSelector((state) => state.news.article)
  const comments = useAppSelector((state) => state.news.comments)

  const filteredComments = comments.filter((comment) => comment.parent === Number(id))
  const { title = '', score = 0, by = '', time = 0, descendants = 0, url = '' } = { ...article }
  const date = new Date(time * 1000).toLocaleString()
  const getNewsInRedux = news.find((item:newsType) => item.id === Number(id)) 

  useEffect(() => {
    if (getNewsInRedux !== undefined) {
      dispatch(sliceActions.setArticle(getNewsInRedux))
    } else {
      dispatch(getArticle(Number(id)))
    }
  })

  const loadComments = useCallback(() => {
    if (article !== null && article.kids) {
      dispatch(getCommentsByIds(article.kids))
    }
  }, [article])

  useEffect(() => {
    loadComments()
  }, [loadComments])

  const refreshComments = useCallback(() => {
    dispatch(updateComments());
  }, [updateComments]);

  useEffect(() => {
    dispatch(getArticle(Number(id)));
    getComments();
  }, [refreshComments])
  
  useEffect(() => {
    const interval = setInterval(() => {
      refreshComments()
    }, 60000)
    return ( ) => clearInterval(interval)
  },[refreshComments])


  return (
    <div>
      <header  className={`container ` + styles.top} >
        <h1>
          Hacker news
        </h1>
        <button
          className={styles.btn}
          onClick={refreshComments}
        >
          Refresh comments
        </button>
        <Link
          className={styles.btn}
          to={"/"}
        >
          Go back
        </Link>
      </header>
      <main className={"container"}  >
        <div className={styles.wrapper} >
          <section className={styles.left}>
            <h2>
              {title}
            </h2>
            <div className={styles.comments_title} >
              Comments: {descendants}
            </div>
          </section>
          <aside className={styles.right}>
            <div className={styles.annotate}>
              <div>
                <span className={styles.by} >
                  by {by}
                </span>
                <span>
                  | Rating: {score}
                </span>
              </div>
              <time>
                posted on {date}
              </time>
            </div>
            <a
              href={url}
              className={styles.link}
              target={"blank"}
            >
              Read more!
            </a>
          </aside>
        </div>
        {
          descendants > 0 &&
          <CommentsList comments={filteredComments}/>
        }
      </main>
    </div>
  )

}

export default News
