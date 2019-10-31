const GetProductInfo = (state = null, action) => {
    switch(action.type){
        case 'PRODUCTS_DATA':
        return action.ProductsData;
        break;
    }
    return state;
}
export default GetProductInfo;
