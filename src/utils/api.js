export const BASE_API_URL = 'https://norma.nomoreparties.space/api';
export const INGREDIENTS_URL = `${BASE_API_URL}/ingredients`;
export const ORDERS_URL = `${BASE_API_URL}/orders`;

export const getData = () => fetch(INGREDIENTS_URL).then(res => res.json())

export const postOrder = (goodsIdArray) => fetch(ORDERS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ 
        "ingredients": goodsIdArray
    })
}).then(res => res.json())