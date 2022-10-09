export const urlAPI = 'https://norma.nomoreparties.space/api/ingredients';

export const getData = () => fetch(urlAPI).then(res => res.json())