export const urlAPI = 'https://norma.nomoreparties.space/api/ingredients';
export const orderUrlAPI = 'https://norma.nomoreparties.space/api/orders';

export const getData = () => fetch(urlAPI).then(res => res.json())

export const postOrder = (goodsIdArray) => fetch(orderUrlAPI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ 
        "ingredients": goodsIdArray
    })
}).then(res => res.json())