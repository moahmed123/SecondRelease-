const Register = (state = null, action) => {
    switch(action.type){
        case 'DATA_REGISTER':
        return action.RegisterCustomer;
        break;
    }
    return state;
}
export default Register;
