const initialState = {
    allCategories:[],
    activeCategory:null
};

const productsReducer = (state = initialState, action)=>{
    switch(action.type){
        case "SETPRODUCTS":
            return {...state, allCategories: action.payload}

        case "FILTER":
            let categoryProducts = state.allCategories.filter(category => category.name === action.payload);
            return {...state, activeCategory: categoryProducts[0]}

        default: return state;
    }
}

export default productsReducer;