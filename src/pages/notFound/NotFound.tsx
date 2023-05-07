import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./styles.module.scss"

const NotFound = () => {
  return (
    <p className={styles.p}>
      Страница не найдена.
      <Link to="/">
        Вернуться к новостям!
      </Link>
    </p>
  );
};

export default NotFound;