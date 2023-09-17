import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Popconfirm, message } from 'antd';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';

import heartFalse from '../../assets/heartFalse.svg';
import heartTrue from '../../assets/heartTrue.svg';
import { postFavorited, delFavorited, deleteArticle } from '../../API/fetchAPI';

import styles from './Article.module.scss';

export default function Article({ data, checkSlug, showmore }) {
  const { user, logged } = useSelector((state) => state.reduserLogin);
  const [active, setActive] = useState(data.favorited);
  const [count, setCount] = useState(data.favoritesCount);
  const [error, setError] = useState(false);
  const image = data.author.image ? data.author.image : 'https://i.pinimg.com/736x/40/ce/e2/40cee25e2b1356a3918935347e6d76b6.jpg';
  const history = useHistory();

  useEffect(() => {
    if (logged) {
      setActive(data.favorited);
    }
  }, [data]);

  const onLikeClick = () => {
    if (logged) {
      setActive((active) => !active);
      setCount(() => (active ? count - 1 : count + 1));
      !active ? postFavorited(data.slug) : delFavorited(data.slug);
    }
  };

  const onLikeClickError = () => {
    if (!logged) {
      message.error("Need you to sign up")
    }
  };

  const confirm = () => {
    deleteArticle(data.slug)
      .then((body) => {
        setError(false);
      })
      .catch(() => setError(true));

    if (!error) {
      message.success('Article deleted');
      history.push('/');
    }
  };

  const push = () => {
    history.push(`/articles/${data.slug}`);
  };

  return (
    <div className={showmore ? styles.article__more : styles.article}>
      <div className={styles.info}>
        <div className={styles.header}>
          <Link to={`/articles/${checkSlug ? checkSlug : data.slug}`} className={styles.title}>
            {data.title}
          </Link>
          <img src={active ? heartTrue : heartFalse} className={styles.heart} onClick={logged ? onLikeClick : onLikeClickError} />
          
          <span>{count}</span>
        </div>
        <div className={styles.tagList}>
          {data.tagList.map((item) => {
            if (item.length === 0 || !item.trim()) {
              return;
            } else {
              const id = uuid();
              return (
                <div key={id} className={styles.tag}>
                  {item}
                </div>
              );
            }
          })}
        </div>
        <div className={styles.description}>{data.description}</div>
      </div>
      <div className={styles.author}>
        <div>
          <div className={styles.name}>{data.author.username}</div>
          <div className={styles.created}>
            {data.createdAt ? format(new Date(data.createdAt), 'MMMM d, yyyy') : 'none'}
          </div>
          {data.author.username === user.username && logged && showmore ? (
            <>
              <Popconfirm
                placement={'right'}
                title="Are you sure to delete this task?"
                onConfirm={confirm}
                onCancel={push}
                okText="Yes"
                cancelText="No"
              >
                <button className={styles.btn_delete}>Delete</button>
              </Popconfirm>
              <button className={styles.btn_edit} onClick={() => history.push(`/articles/${data.slug}/edit`)}>
                Edit
              </button>
            </>
          ) : null}
        </div>
        <img src={image} className={styles.image} />
      </div>
    </div>
  );
}
Article.defaultProps = {
  data: null,
  checkSlug: null,
  showmore: null,
};
Article.prototype = {
  checkSlug: PropTypes.string,
  data: PropTypes.object,
  showmore: PropTypes.bool,
};