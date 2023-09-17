import { setLogged, setUser, setErrorState } from '../store/action';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const baseURL = `https://blog.kata.academy/api/`;

export function signUp(data) {
  const value = {
    username: data.username,
    email: data.email,
    password: data.password,
  };
  return function (update) {
    fetch(`${baseURL}users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: value,
      }),
    })
      .then((response) => response.json())
  };
}
  
export function signIn(email, password) {
  return function (dispatch) {
    fetch('https://blog.kata.academy/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email,
          password,
        },
      }),
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.user) {
          localStorage.setItem('token', body.user.token);
          dispatch(setLogged(true));
          dispatch(setUser(body.user));
          dispatch(setErrorState(''));
        }
        if (body.errors) {
          const value = `${Object.entries(body.errors)
            .map((err) => `${err[0].toString()}`)
            .join(' ')} is invalid`;
          dispatch(setErrorState(value));
          dispatch(setLogged(false));
        }
      });
  };
}
  
  export const checkAuth = () => async (update) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        fetch(`${baseURL}user/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
          .then((response) => response.json())
          .then((body) => {
            update(setLogged(true));
            update(setErrorState(''));
            update(setUser(body.user));
          });
      } else return;
    } catch (error) {
      update(setErrorState(error));
    }
  };
  
  export function updateProfile(data) {
    const token = localStorage.getItem('token');
    return function (update) {
      fetch(`${baseURL}user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          user: data,
        }),
      })
        .then((response) => response.json())

    };
  }
  
  export const setlogOut = () => async (update) => {
    try {
      localStorage.removeItem('token');
      update(setUser({}));
      update(setLogged(false));
      update(setErrorState(''));
    } catch (error) {
      update(setErrorState(error));
    }
  }