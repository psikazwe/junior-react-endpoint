const initialState = {
    activeCategory: {
        index: 0,
        details:{}
    },
    categories: []
}




const linksReducer = (state = initialState , action) => {
    switch(action.type){
        case "SWITCH":
            return {...state,activeCategory:action.payload};
            
        case "SETCATEGORIES":
            return{...state, categories: action.payload}

        default:
            return state;
    }
}

export default linksReducer;