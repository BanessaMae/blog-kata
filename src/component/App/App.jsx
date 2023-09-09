import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { checkAuth } from '../../API/loginAPI';
import Header from '../Header/Header';
import SignIn from '../forms/SignIn';
import SignUp from '../forms/SignUp';
import Profile from '../forms/Profile';
import CreatePost from '../forms/CreatePost';
import CreateCard from '../CreateCard/CreateCard';
import CardList from '../CardList/CardList';

import styles from './App.module.scss';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  return (
    <div className={styles.wrapper}>
      <Router>
      <Header />
        <Route exact path="/" component={CardList}/>
        <Route exact path="/articles" component={CardList} />
        <Route exact path="/articles/:slug" component={CreatePost} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/profile" component={Profile} />
        <Route path="/new-article" component={CreateCard} />
        <Route path="/articles/:slug/edit" component={CreateCard} />
      </Router>
    </div>
  );
}

export default App;
