import { addBunAC, addIngredientAC, calculateTotalPriceAC, clearConstructorAC, deleteIngredientsAC, TConstructorActions, updateConstructorListAC } from "../actions/constructor";
import { TFullIngredient } from "../types/data";
import { constructorReducer, TConstructorInitialState } from "./constructor";

const bun_ingredient: TFullIngredient = {
    u_id:"d1a8e672-cbe7-4a11-a777-e61e445650b5",
    _id: "60d3b41abdacab0026a733c6",
    name: "Краторная булка N-200i",
    type: "bun",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    __v: 0,
    counter: 0
}

const main_ingredient_1: TFullIngredient = {
    u_id:"291d2bc4-2203-44fd-9cc1-16f68d9d7812",
    _id:"60d3b41abdacab0026a733c9",
    name:"Мясо бессмертных моллюсков Protostomia",
    type:"main",
    proteins:433,
    fat:244,
    carbohydrates:33,
    calories:420,
    price:1337,
    image:"https://code.s3.yandex.net/react/code/meat-02.png",
    image_mobile:"https://code.s3.yandex.net/react/code/meat-02-mobile.png",
    image_large:"https://code.s3.yandex.net/react/code/meat-02-large.png",
    __v:0,
    counter:0,
}

const main_ingredient_2: TFullIngredient = {
    u_id:"d1a8e672-cbe7-4a11-a777-e61e445650b5",
    _id:"60d3b41abdacab0026a733c8",
    name:"Филе Люминесцентного тетраодонтимформа",
    type:"main",
    proteins:44,
    fat:26,
    carbohydrates:85,
    calories:643,
    price:988,
    image:"https://code.s3.yandex.net/react/code/meat-03.png",
    image_mobile:"https://code.s3.yandex.net/react/code/meat-03-mobile.png",
    image_large:"https://code.s3.yandex.net/react/code/meat-03-large.png",
    __v:0,
    counter:0,
}

it('new bun shoud be added', () => {
    let action: TConstructorActions = addBunAC(bun_ingredient)

    let state: TConstructorInitialState = {
        items: [],
        bun: null,
        totalPrice: 0
    }

    let newState = constructorReducer(state, action);
    
    expect(newState).toEqual({
        items: [],
        bun: bun_ingredient,
        totalPrice: 0
    })
})

it('new item shoud be added', () => {
    let action: TConstructorActions = addIngredientAC(main_ingredient_1)

    let state: TConstructorInitialState = {
        items: [],
        bun: null,
        totalPrice: 0
    }

    let newState = constructorReducer(state, action);
    
    expect(newState).toEqual({
        items: [ main_ingredient_1 ],
        bun: null,
        totalPrice: 0
    })
})

it('item shoud be deleted', () => {
    let action: TConstructorActions = deleteIngredientsAC(main_ingredient_1.u_id)

    let state: TConstructorInitialState = {
        items: [ main_ingredient_1 ],
        bun: null,
        totalPrice: 1337
    }

    let newState = constructorReducer(state, action);
    
    expect(newState).toEqual({
        items: [],
        bun: null,
        totalPrice: 1337,
    })
})

it('constructor list shoud be updated', () => {
    let action: TConstructorActions = updateConstructorListAC([ main_ingredient_2, main_ingredient_1 ])

    let state: TConstructorInitialState = {
        items: [ main_ingredient_1, main_ingredient_2],
        bun: null,
        totalPrice: 2325
    }

    let newState = constructorReducer(state, action);
    
    expect(newState).toEqual({
        items: [ main_ingredient_2, main_ingredient_1 ],
        bun: null,
        totalPrice: 2325
    })
})

it('total price should be calculate', () => {
    let action: TConstructorActions = calculateTotalPriceAC()

    let state:TConstructorInitialState = {
        items: [],
        bun: bun_ingredient,
        totalPrice: 0
    }

    let newState = constructorReducer(state, action);

    expect(newState.totalPrice).toBe(2510)
})

it('constructor store shoud be clear', () => {
    let action: TConstructorActions = clearConstructorAC()

    let state:TConstructorInitialState = {
        items: [ main_ingredient_1 ],
        bun: bun_ingredient,
        totalPrice: 2510
    }

    let newState = constructorReducer(state, action);
    
    expect(newState).toEqual({
        items: [],
        bun: null,
        totalPrice: 0
    })
})
