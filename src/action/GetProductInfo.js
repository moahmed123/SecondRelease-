import axios from 'axios';

export function GetProductInfo( urlStore, Token, productId){
    return(dispatch) => {
        return axios.post(urlStore, {            
            token: Token,
            product_id: productId
        })
        .then((response) => {
            dispatch(ProductInfo(response.data));           
            console.log(response.data)
        })
        .catch( (error) => {
          console.log(error.message);
        });
    }
}
// Delete Data To Don't Show For Cahed data.
export function refreshData(){
    return(dispatch) => {
        return dispatch(ProductInfo(null));
    }
}

export function ProductInfo(result){
    return{
        type: 'PRODUCTS_DATA',
        ProductsData: result
    }
}