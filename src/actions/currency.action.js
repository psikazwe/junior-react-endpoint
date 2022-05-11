export const currenyToggle = ()=>{
    return {
        type: "TOGGLECURRENCY",
    }
}

export const hideCurrency =() =>{
    return {
        type: "HIDECURRENCY",
    }
}

export const setCurrencies = (data) =>{
    return{
        type: "SETCURRENCIES",
        payload: data
    }
}

export const setCurrency = data =>{
    return{
        type: "SETACTIVECURRENCY",
        payload: data
    }    
}