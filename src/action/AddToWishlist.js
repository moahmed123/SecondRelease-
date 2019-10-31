import axios from 'axios';

export function AddToWishlist( urlStore, Token, productId){
    return(dispatch) => {
        return axios.post(urlStore, {
            token: Token,
            product_id: productId
        })
        .then((response) => {
            dispatch(AddToWishlistResult(response.data));           
            console.log(response.data)
        })
        .catch( (error) => {
          console.log(error.message);
        });
    }
}