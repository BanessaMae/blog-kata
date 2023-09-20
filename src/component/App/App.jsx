import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { checkAuth } from '../../API/loginAPI';
import Header from '../Header/Header';
import SignIn from '../forms/SignIn';
import SignUp from '../forms/SignUp';
import Profile from '../forms/Profile';
import CreatePost from '../forms/CreatePost';
import CreateArticle from '../CreateArticle/CreateArticle';
import ArticleList from '../ArticleList/ArticleList';

import {slash} from '../Route/Route';
import {article} from '../Route/Route';
import {articleSlug} from '../Route/Route';
import {signUp} from '../Route/Route';
import {newArticle} from '../Route/Route';
import {articleSlugEdit} from '../Route/Route';
import {profile} from '../Route/Route';
import {signIn} from '../Route/Route';


import {getArticleList} from '../../API/articleAPI'

import styles from './App.module.scss';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
    getArticleList()
  }, []);



  return (
    <div className={styles.wrapper}>
      <Router>
      <Header />
        <Route exact path={slash} component={ArticleList}/>
        <Route exact path={article} component={ArticleList} />
        <Route exact path={articleSlug} component={CreatePost} />
        <Route path={signUp} component={SignUp} />
        <Route path={signIn} component={SignIn} />
        <Route path={profile} component={Profile} />
        <Route path={newArticle} component={CreateArticle} />
        <Route path={articleSlugEdit} component={CreateArticle} />
      </Router>
    </div>
  );
}

export default App;
