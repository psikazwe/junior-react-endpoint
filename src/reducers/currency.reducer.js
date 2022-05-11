const initialSate ={
    show: false,
    currencies: null,
    activeCurrency: null,
}


const currencyReducer = ( state = initialSate, action) =>{
    switch(action.type){
        case "TOGGLECURRENCY":
            return {...state, show: !state.show}

        case "HIDECURRENCY":
            return {...state, show: false}

        case "SETCURRENCIES":
            return {...state, currencies: action.payload}

        case "SETACTIVECURRENCY":
            return {...state, activeCurrency: action.payload}

        default: return state;
    }
}

export default currencyReducer;