const iniatialState = {
    appLoading: true,
    categoriesLoading: true,
    productsLoading: true,
}

const appReducer = ( state = iniatialState, action) => {
    switch(action.type){
        case "APP":
            return {...state, appLoading: action.payload}
        case "CATEGORY":
            return {...state, categoriesLoading: action.payload}
        case "PROCUCTS":
            return {...state, productsLoading: action.payload}
        default:
            return state;
    }
}

export default appReducer;