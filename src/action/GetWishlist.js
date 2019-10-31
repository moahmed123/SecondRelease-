import axios from 'axios';

export function GetWishlist( urlStore, Token){
    return(dispatch) => {
        return axios.post(urlStore, {token: Token})
        .then((response) => {
            dispatch(GetWishlistResult(response.data));           
            console.log(response.data)
        })
        .catch( (error) => {
          console.log(error.message);
        });
    }
}

export function GetWishlistResult(result){
    return{
        type: 'GET_WISHLIST',
        GetWishlist: result
    }
}