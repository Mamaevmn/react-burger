import { checkResponse } from "./const";
import { getCookie } from "./cookie";

export const BASE_API_URL = 'https://norma.nomoreparties.space/api';
export const INGREDIENTS_URL = `${BASE_API_URL}/ingredients`;
export const ORDERS_URL = `${BASE_API_URL}/orders`;
export const PASSWORD_RECOVERY_URL = `${BASE_API_URL}/password-reset`;
export const PASSWORD_RESET_URL = `${BASE_API_URL}/reset`;

export const AUTH_URL = `${BASE_API_URL}/auth`;
export const LOGIN_URL = `${AUTH_URL}/login`;
export const LOGOUT_URL = `${AUTH_URL}/logout`;
export const UPDATE_TOKEN_URL = `${AUTH_URL}/token`;
export const USER_REGISTRATION_URL = `${AUTH_URL}/register`;
export const USER_INFO_URL = `${AUTH_URL}/user`;

export const getData = () => request(INGREDIENTS_URL)

export const postOrder = (goodsIdArray) => request(ORDERS_URL, {
  method: 'POST',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json'
  },
  redirect: 'follow',
  referrerPolicy: 'no-referrer',
  body: JSON.stringify({ 
    "ingredients": goodsIdArray
  })
}) 

export const postUserRegistration = (name, email, password) => request( USER_REGISTRATION_URL, {
  method: 'POST',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json'
  },
  redirect: 'follow',
  referrerPolicy: 'no-referrer',
  body: JSON.stringify({ 
    "email": email, 
    "password": password, 
    "name": name,
  })
})

export const postUserLogin = (email, password) => request(LOGIN_URL, {
  method: 'POST',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json'
  },
  redirect: 'follow',
  referrerPolicy: 'no-referrer',
  body: JSON.stringify({ 
    "email": email, 
    "password": password, 
  })
})

export const postUserLogout = () => request(LOGOUT_URL, {
  method: 'POST',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json'
  },
  redirect: 'follow',
  referrerPolicy: 'no-referrer',
  body: JSON.stringify({ 
    "token": getCookie('refreshToken'), 
  })
})

export const getUserInfo = () => request(USER_INFO_URL, {
  method: 'GET',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + getCookie('token')
  },
  redirect: 'follow',
  referrerPolicy: 'no-referrer'
})

export const editUserInfo = (name, email, password) => request(USER_INFO_URL, {
  method: 'PATCH',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + getCookie('token')
  },
  redirect: 'follow',
  referrerPolicy: 'no-referrer',
  body: JSON.stringify({ 
    "email": email, 
    "password": password, 
    "name": name,
  })
})

export const postPasswordReсovery = (email) => request(PASSWORD_RECOVERY_URL, {
  method: 'POST',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json'
  },
  redirect: 'follow',
  referrerPolicy: 'no-referrer',
  body: JSON.stringify({ 
    "email": email
  })
})

export const postPasswordReset = (password, token) => request(PASSWORD_RESET_URL,{
  method: 'POST',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json'
  },
  redirect: 'follow',
  referrerPolicy: 'no-referrer',
  body: JSON.stringify({ 
    "password": password,
    "token": token
  })
}) 

export const postUpdateToken = () => request(UPDATE_TOKEN_URL, {
  method: 'POST',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json'
  },
  redirect: 'follow',
  referrerPolicy: 'no-referrer',
  body: JSON.stringify({ 
    "token": getCookie('refreshToken'), 
  })
})


function request(url, options) {
  return fetch(url, options).then(checkResponse)
}