import axios from 'axios';

export function RemoveProductCart( urlStore, Token, key){
    return(dispatch) => {
        return axios.post(urlStore, {
            token: Token,
            key: key
        })
        .then((response) => {
            dispatch(RemoveProduct(response.data));           
            console.log(response.data)
        })
        .catch( (error) => {
          console.log(error.message);
        });
    }
}

export function RemoveProduct(result){
    return{
        type: 'REMOVE_PRODUCT_CART',
        RemoveProductCart: result
    }
}