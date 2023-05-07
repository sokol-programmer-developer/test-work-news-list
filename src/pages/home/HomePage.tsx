import React, {useEffect} from "react";
import styles from "./styles.module.scss"
import Header from "../../components/header/Header";
import NewsList from "../../components/NewsList";
import {getNews} from "../../redux/slices/actions";
import {useAppDispatch, useAppSelector} from "../../redux/store";


const HomePage: React.FC = () => {

  const storiesLoading = useAppSelector((state) => state.news.newsLoading)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getNews())
  }, [])
  
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getNews())
    }, 60000)
    return () => clearInterval(interval)
  })



  return (
    <div>
      <Header />

      <main className="container">

        {
          storiesLoading && (
            <div className={styles.loading}>
              <h3 className={styles.text}>
                Loading news...
              </h3>  
              
              <svg className={styles.svg} version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" enableBackground="new 0 0 0 0">
                <path fill="#2196f3" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                  <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50" to="360 50 50" repeatCount="indefinite"/>
                </path>
              </svg>  

            </div>
          )
        }  
        {
          !storiesLoading && <NewsList />
        }

      </main>
    </div>
  )
}

export default HomePage
