const GetCategoryProducts = (state = null, action) => {
    switch(action.type){
        case 'CATEGORY_PRODUCTS_DATA':
        return action.CategoryProductsData;
        break;
    }
    return state;
}
export default GetCategoryProducts;
