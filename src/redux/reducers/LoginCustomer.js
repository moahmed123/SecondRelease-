const LoginCustomer = (state = null, action) => {
    switch(action.type){
        case 'DATA_LOGIN':
        return action.LoginCustomerData;
        break;
    }
    return state;
}
export default LoginCustomer;
