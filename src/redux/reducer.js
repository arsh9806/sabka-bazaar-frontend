import actionTypes from './actionTypes';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

const initialState = {
    cart: {},
    categories: undefined
}

const defaultReducer = (state = initialState, action) => {
    const { payload } = action;
    
    switch (action.type) {
        case actionTypes.INC_ITEM:
            return {
                ...state,
                cart: {
                    ...state.cart,
                    [payload]: {
                        ...state.cart[payload],
                        quantity: Math.min(state.cart[payload].quantity + 1, state.cart[payload].stock)
                    }
                }
            }

        case actionTypes.DEC_ITEM:
            return {
                ...state,
                cart: {
                    ...state.cart,
                    [payload]: {
                        ...state.cart[payload],
                        quantity: Math.max(state.cart[payload].quantity - 1, 1)
                    }
                }
            }

        case actionTypes.ADD_CART_ITEM:
            return {
                ...state,
                cart: {
                    ...state.cart,
                    [payload.sku]: {...payload, quantity: 1},
                }
            }

        case actionTypes.REMOVE_CART_ITEM:
            const newCartState = { ...state.cart };
            delete newCartState[payload];

            return {
                ...state,
                cart: newCartState
            }

        case actionTypes.SET_CATEGORIES:
            return {
                ...state,
                categories: payload
            }

        case actionTypes.CLEAR_CART:
            return {
                ...state,
                cart: {}
            }

        default:
            return state;
    }
}

export default persistReducer({
    key: 'root',
    storage,
    whitelist: ['cart']
}, defaultReducer);