import { closeModalAC, openModalAC } from "../actions/modals";
import { modalsReducer, TModalsInitialState } from "./modals";

it('modal shoud be opened', () => {
    let action = openModalAC()

    let state: TModalsInitialState = {
        visible: false,
        type: '',
    }

    let newState = modalsReducer(state, action);
    
    expect(newState.visible).toBeTruthy()
})

it('modal shoud be closed', () => {
    let action = closeModalAC()

    let state:TModalsInitialState = {
        visible: true,
        type: '',
    }

    let newState = modalsReducer(state, action);
    
    expect(newState.visible).toBeFalsy()
})