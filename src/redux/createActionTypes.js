import actionTypes from "./actionTypes"

export const addItemToCart = (item) => {
    return {
        type: actionTypes.ADD_CART_ITEM,
        payload: item
    }
}
export const incrementQuantity = (id) => {
    return {
        type: actionTypes.INC_ITEM,
        payload: id
    }
}

export const decrementQuantity = (id) => {
    return {
        type: actionTypes.DEC_ITEM,
        payload: id
    }
}

export const removeItemFromCart = (id) => {
    return {
        type: actionTypes.REMOVE_CART_ITEM,
        payload: id
    }
}

export const setCategories = (categories) => {
    return {
        type: actionTypes.SET_CATEGORIES,
        payload: categories
    }
}

export const clearCart = () => {
    return {
        type: actionTypes.CLEAR_CART,
    }
}



