export const showCart = () =>{
    return{
        type: "SHOW"
    }
}

export const hideCart = () =>{
    return{
        type: "HIDE"
    }
}

export const toggleCart = () =>{
    return{
        type: "TOGGLE"
    }
}

export const clearCart = () =>{
    return{
        type: "CLEARCART"
    }
}


export const addToCart = (item, attributes) =>{
    item = {...item, quantity: 1, selectedAttributes: attributes}
    return{
        type: "ADDTOCART",
        payload: item,
    }
}

export const editAttribute = (itemID, attributes) =>{
    return{
        type: "EDITATTRIBUTE",
        payload: attributes,
        item: itemID
    }
}

export const removeFromCart = (item) =>{
    return{
        type: "REMOVEFROMCART",
        payload: item,
    }
}

export const incrementAnItem = (id)=>{
    return{
        type: "INCREMENT-AN-ITEM",
        payload: id
    }
}

export const decrementAnItem = (id)=>{
    return{
        type: "DECREMENT-AN-ITEM",
        payload: id
    }
}