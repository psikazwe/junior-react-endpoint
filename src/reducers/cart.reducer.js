const initialSate = {
    show: false,
    productCount: 0,
    products: [],
    effect: true
}

const cartReducer = (state = initialSate, action) =>{

    switch(action.type){
        case "INCREMENT":
            return state.items.push("increment");
        
        case "SHOW":
            return {...state, show: true};

        case "HIDE":
            return {...state, show: false};

        case "TOGGLE":
            return {...state, show: !state.show};

        case "CLEARCART":
            return {...state, products: [],  show: false, productCount: 0};

        case "ADDTOCART":
            let products = state.products;
            products.push(action.payload);
            return {...state, products: products, productCount: state.productCount+1};

        case "REMOVEFROMCART":
            let remainingProducts = state.products.filter( prod => prod.id !== action.payload.id);
            return {...state, products: remainingProducts, productCount: state.productCount !== 0 ? state.productCount-1 : 0};

        case "INCREMENT-AN-ITEM":
            state.products[action.payload].quantity++;
            return {...state, effect: !state.effect};
            
        case "DECREMENT-AN-ITEM":
            state.products[action.payload].quantity--;
            return {...state, effect: !state.effect};

        case "EDITATTRIBUTE":
            // state.products[action.item].selectedAttributes = action.payload;
            let product = state.products[action.item];
            product.selectedAttributes = action.payload;
            let productsList = state.products;
            productsList[action.item] = product;
            
            return {...state, products: productsList, effect: !state.effect};

        default:
            return state;
    }

}


export default cartReducer;