import { clearItemCountAC, decreaseItemCountAC, getIngredientsTypesAC, increaseItemCountAC, ingredientsFailedRequestAC, ingredientsRequestAC, ingredientsSuccessRequestAC, setCurrentTabAC, TIngredientsActions } from '../actions/ingredients';
import { ingredientsReducer, TIngredientsInitialState } from './ingredients';

it('ingredients should be request', () => {
    let action: TIngredientsActions = ingredientsRequestAC()

    let state:TIngredientsInitialState = {
        items: [],
        itemsRequest: false,
        itemsFailed: false,
        ingredientTypes: [],
        currentTab: null,
    }

    let newState = ingredientsReducer(state, action);
    
    expect(newState).toEqual({
        items: [],
        itemsRequest: true,
        itemsFailed: false,
        ingredientTypes: [],
        currentTab: null,
    })
})

it('get ingredients should be success', () => {
    let action: TIngredientsActions = ingredientsSuccessRequestAC([
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
        }
    ])

    let state:TIngredientsInitialState = {
        items: [],
        itemsRequest: true,
        itemsFailed: false,
        ingredientTypes: [],
        currentTab: null,
    }

    let newState = ingredientsReducer(state, action);
    
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
            }
        ],
        itemsRequest: false,
        itemsFailed: false,
        ingredientTypes: [],
        currentTab: null,
    })
})

it('get ingredients should be failed', () => {
    let action: TIngredientsActions = ingredientsFailedRequestAC()

    let state:TIngredientsInitialState = {
        items: [],
        itemsRequest: true,
        itemsFailed: false,
        ingredientTypes: [],
        currentTab: null,
    }

    let newState = ingredientsReducer(state, action);
    
    expect(newState).toEqual({
        items: [],
        itemsRequest: false,
        itemsFailed: true,
        ingredientTypes: [],
        currentTab: null,
    })
})

it('ingredients types should be getted', () => {
    let action: TIngredientsActions = getIngredientsTypesAC()

    let state:TIngredientsInitialState = {
        items: [
            {
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
                counter: 2,
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
                counter: 2,
            }
        ],
        itemsRequest: false,
        itemsFailed: false,
        ingredientTypes: [],
        currentTab: null,
    }

    let newState = ingredientsReducer(state, action);
    
    expect(newState.ingredientTypes.length).toBe(2)
})

it('current tab should be setted', () => {
    let action: TIngredientsActions = setCurrentTabAC('bun')

    let state:TIngredientsInitialState = {
        items: [],
        itemsRequest: false,
        itemsFailed: false,
        ingredientTypes: [],
        currentTab: null,
    }

    let newState = ingredientsReducer(state, action);
    
    expect(newState).toEqual({
        items: [],
        itemsRequest: false,
        itemsFailed: false,
        ingredientTypes: [],
        currentTab: 'bun',
    })
})

it('bun count should be increased', () => {
    let action: TIngredientsActions = increaseItemCountAC('60d3b41abdacab0026a733c6')

    let state:TIngredientsInitialState = {
        items: [
            {
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
                counter: 0,
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
                counter:5,
            }
        ],
        itemsRequest: false,
        itemsFailed: false,
        ingredientTypes: [],
        currentTab: null,
    }

    let newState = ingredientsReducer(state, action);
    
    expect(newState).toEqual({
        items: [
            {
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
                counter: 2
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
                counter:5,
            }
        ],
        itemsRequest: false,
        itemsFailed: false,
        ingredientTypes: [],
        currentTab: null,
    })
})

it('bun count should be decreased', () => {
    let action: TIngredientsActions = decreaseItemCountAC('60d3b41abdacab0026a733c6')

    let state:TIngredientsInitialState = {
        items: [
            {
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
                counter: 2,
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
                counter:5,
            }
        ],
        itemsRequest: false,
        itemsFailed: false,
        ingredientTypes: [],
        currentTab: null,
    }

    let newState = ingredientsReducer(state, action);
    
    expect(newState).toEqual({
        items: [
            {
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
                counter: 0,
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
                counter:5,
            }
        ],
        itemsRequest: false,
        itemsFailed: false,
        ingredientTypes: [],
        currentTab: null,
    })
})

it('main count should be increased', () => {
    let action: TIngredientsActions = increaseItemCountAC('60d3b41abdacab0026a733c8')

    let state:TIngredientsInitialState = {
        items: [
            {
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
                counter: 2,
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
                counter:5,
            }
        ],
        itemsRequest: false,
        itemsFailed: false,
        ingredientTypes: [],
        currentTab: null,
    }

    let newState = ingredientsReducer(state, action);
    
    expect(newState).toEqual({
        items: [
            {
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
                counter: 2,
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
                counter:6,
            }
        ],
        itemsRequest: false,
        itemsFailed: false,
        ingredientTypes: [],
        currentTab: null,
    })
})

it('main count should be decreased', () => {
    let action: TIngredientsActions = decreaseItemCountAC('60d3b41abdacab0026a733c8')

    let state:TIngredientsInitialState = {
        items: [
            {
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
                counter: 2,
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
                counter:5,
            }
        ],
        itemsRequest: false,
        itemsFailed: false,
        ingredientTypes: [],
        currentTab: null,
    }

    let newState = ingredientsReducer(state, action);
    
    expect(newState).toEqual({
        items: [
            {
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
                counter: 2,
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
                counter:4,
            }
        ],
        itemsRequest: false,
        itemsFailed: false,
        ingredientTypes: [],
        currentTab: null,
    })
})

it('ingredients count should be clear', () => {
    let action: TIngredientsActions = clearItemCountAC()

    let state:TIngredientsInitialState = {
        items: [
            {
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
                counter: 2,
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
                counter:5,
            }
        ],
        itemsRequest: false,
        itemsFailed: false,
        ingredientTypes: [],
        currentTab: null,
    }

    let newState = ingredientsReducer(state, action);
    
    expect(newState).toEqual({
        items: [
            {
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
                counter: 0,
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
            }
        ],
        itemsRequest: false,
        itemsFailed: false,
        ingredientTypes: [],
        currentTab: null,
    })
})