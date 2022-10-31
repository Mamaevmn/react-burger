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

export const getData = () => fetch(INGREDIENTS_URL).then(res => res.json())

export const postOrder = (goodsIdArray) => fetch(ORDERS_URL, {
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
}).then(res => res.json())

export const postUserRegistration = (name, email, password) => fetch(USER_REGISTRATION_URL, {
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
}).then(res => res.json())

export const postUserLogin = (email, password) => fetch(LOGIN_URL, {
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
}).then(res => res.json())

export const postUserLogout = () => fetch(LOGOUT_URL, {
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
}).then(res => res.json())

export const getUserInfo = () => fetch(USER_INFO_URL, {
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
}).then(res => res.json())

export const editUserInfo = (name, email, password) => fetch(USER_INFO_URL, {
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
}).then(res => res.json())

export const postPasswordReсovery = (email) => fetch(PASSWORD_RECOVERY_URL, {
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
}).then(res => res.json())

export const postPasswordReset = (password, token) => fetch(PASSWORD_RESET_URL, {
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
}).then(res => res.json())

export const postUpdateToken = () => fetch(UPDATE_TOKEN_URL, {
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
}).then(res => res.json())