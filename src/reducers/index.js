import { combineReducers } from "redux";
import appReducer from "./app.reducer";
import cartReducer from "./cart.reducer";
import currencyReducer from "./currency.reducer";
import linksReducer from "./navbar.reducer";
import productsReducer from "./products.reducer";

const allReducers = combineReducers({
    currency: currencyReducer,
    cart: cartReducer,
    link: linksReducer,
    products: productsReducer,
    app: appReducer,
});



export default allReducers;