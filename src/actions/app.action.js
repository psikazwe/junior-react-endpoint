export const loadingApp = (payload) =>{
    return {
        type: "APP",
        payload: payload
    }
}

export const loadingCategories = (payload) =>{
    return {
        type: "CATEGORY",
        payload: payload
    }
}

export const loadingProducts = (payload) =>{
    return {
        type: "PROCUCTS",
        payload: payload
    }
}