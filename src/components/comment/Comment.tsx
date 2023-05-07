import React, {useState} from "react";
import styles from "./styles.module.scss";
import CommentsList from "../commentsList/CommentsList";
import {getCommentsByIds} from "../../redux/slices/actions";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {commentsType} from "../../redux/slices/news/types";

function Comment(props: commentsType) {
  const dispatch = useAppDispatch();
  const { by, id, kids, text = "", time, deleted } = props;
  
  const subComments = useAppSelector((state) => state.news.comments);
  const filteredSubComments = subComments.filter((comment) => comment.parent === id);
  
  const [moreCommentsIsVisible, setMoreCommentsIsVisible] = useState<boolean>(false);
  const date = new Date(time * 1000).toLocaleString();
  const subCommentVisibility = moreCommentsIsVisible ? styles.visibleCom : styles.hideCom;

  const showMoreComments = () => {
    setMoreCommentsIsVisible(!moreCommentsIsVisible);
    if (!moreCommentsIsVisible) {
      if (kids) {
        dispatch(getCommentsByIds(kids));
      }
    }
  };


    return (
    <article className={styles.comment}>
      <div className={styles.info}>
        <time>
          posted on {date}
        </time>
        {
          by && 
          <span className={styles.by}>
            | by {by}
          </span>
        }
      </div>  
        {
          deleted
            ?            
            <p>
              Comment deleted
            </p>
            :
            <p  dangerouslySetInnerHTML={{__html: `${text}`}} >                
            </p>
        }
        {
          kids &&
            (
              <button
                className={styles.btn}
                onClick={showMoreComments}
              >
                {
                  moreCommentsIsVisible
                    ?
                    "Show less [-]"
                    :
                    "Show more [+]"  
                }
              </button>
            )
        }
        {
          kids &&
            (
              <div className={subCommentVisibility}>
                <CommentsList comments={filteredSubComments} />    
              </div>
            )
        }
      
    </article>
   ) 
}

export default Comment
