import axios from 'axios';

export function CartProducts( urlStore, Token){
    return(dispatch) => {
        return axios.post(urlStore, {token: Token})
        .then((response) => {
            dispatch(CartProductsResult(response.data));           
            console.log(response.data)
        })
        .catch( (error) => {
          console.log(error.message);
        });
    }
}

export function CartProductsResult(result){
    return{
        type: 'CART_PRODUCT_RESULT',
        CartProductsResult: result
    }
}