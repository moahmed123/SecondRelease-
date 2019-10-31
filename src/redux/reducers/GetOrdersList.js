const GetOrdersList = (state = null, action) => {
    switch(action.type){
        case 'GET_ORDER_LIST':
        return action.OrdersList;
        break;
    }
    return state;
}
export default GetOrdersList;
