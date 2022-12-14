import { checkResponse } from "./const";
import { getCookie } from "./cookie";

const WS = 'wss://'
const HTTPS = 'https://'

export const BASE_URL = `norma.nomoreparties.space` as const;
export const BASE_API_URL = `${HTTPS}${BASE_URL}/api` as const;
export const INGREDIENTS_URL = `${BASE_API_URL}/ingredients` as const;
export const ORDERS_URL = `${BASE_API_URL}/orders` as const;
export const PASSWORD_RECOVERY_URL = `${BASE_API_URL}/password-reset` as const;
export const PASSWORD_RESET_URL = `${BASE_API_URL}/reset` as const;

export const AUTH_URL = `${BASE_API_URL}/auth` as const;
export const LOGIN_URL = `${AUTH_URL}/login` as const;
export const LOGOUT_URL = `${AUTH_URL}/logout` as const;
export const UPDATE_TOKEN_URL = `${AUTH_URL}/token` as const;
export const USER_REGISTRATION_URL = `${AUTH_URL}/register` as const;
export const USER_INFO_URL = `${AUTH_URL}/user` as const;

export const WS_URL_ORDERS = `${WS}${BASE_URL}/orders` as const;
export const WS_URL_ORDERS_ALL = `${WS_URL_ORDERS}/all` as const;

export const getData = () => request(INGREDIENTS_URL, null)

export const postOrder = (goodsIdArray: Array<string>) => request(`${ORDERS_URL}`, {
  method: 'POST',
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
    "ingredients": goodsIdArray
  })
}) 

export const postUserRegistration = (
    name: string, 
    email: string, 
    password: string
  ) => request( USER_REGISTRATION_URL, {
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

export const postUserLogin = ( 
    email: string, 
    password: string
  ) => request(LOGIN_URL, {
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

export const editUserInfo = (
    name: string, 
    email: string, 
    password: string
  ) => request(USER_INFO_URL, {
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

export const postPasswordRe??overy = (
    email: string
  ) => request(PASSWORD_RECOVERY_URL, {
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

export const postPasswordReset = (
    password: string,
  ) => request(PASSWORD_RESET_URL,{
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
    "token": getCookie('token')
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

function request(url: string, options: RequestInit) {
  return fetch(url, options).then(checkResponse)
}