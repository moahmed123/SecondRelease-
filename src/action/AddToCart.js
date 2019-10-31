import axios from 'axios';

export function AddToCart( urlStore, Token, productId, quantity, option){
    return(dispatch) => {
        return axios.post(urlStore, {            
            token: Token,
            product: 
                [
                    {
                        product_id: productId,
                        quantity: quantity,
                        option: option
                        // option: { "2374" : "9225" }, { "2365" : "9192" }
                        
                    }
                ]
        })
        .then((response) => {
            dispatch(AddToCartResult(response.data));           
            console.log(response.data)
            console.log(option)
        })
        .catch( (error) => {
          console.log(error.message);
        });
    }
}

export function AddToCartResult(result){
    return{
        type: 'ADD_TO_CART',
        AddToCartResult: result
    }
}