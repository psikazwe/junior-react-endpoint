export const getProducts=(category)=>{
    return{
        type: "SETPRODUCTS",
        payload: category
    }
}

export const filterProducts =(category) =>{
    return{
        type: "FILTER",
        payload: category
    }
}