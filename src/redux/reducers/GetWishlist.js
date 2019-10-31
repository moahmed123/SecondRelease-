const GetWishlist = (state = null, action) => {
    switch(action.type){
        case 'GET_WISHLIST':
        return action.GetWishlist;
        break;
    }
    return state;
}
export default GetWishlist;
