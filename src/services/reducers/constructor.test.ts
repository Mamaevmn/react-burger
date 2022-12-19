import { addBunAC, addIngredientAC, calculateTotalPriceAC, clearConstructorAC, deleteIngredientsAC, TConstructorActions, updateConstructorListAC } from "../actions/constructor";
import { constructorReducer, TConstructorInitialState } from "./constructor";

it('new bun shoud be added', () => {
    let action: TConstructorActions = addBunAC({
            u_id:"291d2bc4-2203-44fd-9cc1-16f68d9d7812",
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
    })

    let state: TConstructorInitialState = {
        items: [],
        bun: null,
        totalPrice: 0
    }

    let newState = constructorReducer(state, action);
    
    expect(newState).toEqual({
        items: [],
        bun: {
            u_id:"291d2bc4-2203-44fd-9cc1-16f68d9d7812",
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
        },
        totalPrice: 0
    })
})

it('new item shoud be added', () => {
    let action: TConstructorActions = addIngredientAC({
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
        u_id:"291d2bc4-2203-44fd-9cc1-16f68d9d7812",
    })

    let state: TConstructorInitialState = {
        items: [],
        bun: null,
        totalPrice: 0
    }

    let newState = constructorReducer(state, action);
    
    expect(newState).toEqual({
        items: [
            {
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
                u_id:"291d2bc4-2203-44fd-9cc1-16f68d9d7812",
            }
        ],
        bun: null,
        totalPrice: 0
    })
})

it('item shoud be deleted', () => {
    let action: TConstructorActions = deleteIngredientsAC('291d2bc4-2203-44fd-9cc1-16f68d9d7812')

    let state: TConstructorInitialState = {
        items: [
            {
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
                u_id:"291d2bc4-2203-44fd-9cc1-16f68d9d7812",
            }
        ],
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
    let action: TConstructorActions = updateConstructorListAC([
        {
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
            u_id:"d1a8e672-cbe7-4a11-a777-e61e445650b5"
        },
        {
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
            u_id:"0a9b8704-8d7c-4431-b855-9a44ae36591e",
        }
    ])

    let state: TConstructorInitialState = {
        items: [
            {
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
                u_id:"0a9b8704-8d7c-4431-b855-9a44ae36591e",
            },
            {
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
                u_id:"d1a8e672-cbe7-4a11-a777-e61e445650b5"
            }
        ],
        bun: null,
        totalPrice: 2325
    }

    let newState = constructorReducer(state, action);
    
    expect(newState).toEqual({
        items: [
            {
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
                u_id:"d1a8e672-cbe7-4a11-a777-e61e445650b5"
            },
            {
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
                u_id:"0a9b8704-8d7c-4431-b855-9a44ae36591e",
            }
        ],
        bun: null,
        totalPrice: 2325
    })
})

it('total price should be calculate', () => {
    let action: TConstructorActions = calculateTotalPriceAC()

    let state:TConstructorInitialState = {
        items: [],
        bun: {
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
        },
        totalPrice: 0
    }

    let newState = constructorReducer(state, action);

    expect(newState.totalPrice).toBe(2510)
})

it('constructor store shoud be clear', () => {
    let action: TConstructorActions = clearConstructorAC()

    let state:TConstructorInitialState = {
        items: [{
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
            u_id:"0a9b8704-8d7c-4431-b855-9a44ae36591e",
        }],
        bun: {
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
        },
        totalPrice: 2510
    }

    let newState = constructorReducer(state, action);
    
    expect(newState).toEqual({
        items: [],
        bun: null,
        totalPrice: 0
    })
})
