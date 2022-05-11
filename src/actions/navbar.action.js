
export const setCategories = (data) =>{
    return{
        type: "SETCATEGORIES",
        payload: data,
    }
}

export const route = (data) =>{
    return{
        type: "SWITCH",
        payload: data
    }
}