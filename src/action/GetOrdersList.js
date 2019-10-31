import axios from 'axios';

export function GetOrdersList( urlStore, Token){
    return(dispatch) => {
        return axios.post(urlStore, {token: Token})
        .then((response) => {
            dispatch(GetOrdersListResult(response.data));           
            console.log(response.data)
        })
        .catch( (error) => {
          console.log(error.message);
        });
    }
}

export function GetOrdersListResult(result){
    return{
        type: 'GET_ORDER_LIST',
        OrdersList: result
    }
}