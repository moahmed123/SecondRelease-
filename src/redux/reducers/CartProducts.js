const CartProducts = (state = null, action) => {
    switch(action.type){
        case 'CART_PRODUCT_RESULT':
        return action.CartProductsResult;
        break;
    }
    return state;
}
export default CartProducts;
