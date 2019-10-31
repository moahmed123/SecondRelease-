import axios from 'axios';

export function LoginCustomer( parametersurl, token, email, password, ){
    return(dispatch) => {
        return axios.post(parametersurl, {
            token: token ,
            email: email,
            password: password 
        })
        .then((response) => {
            dispatch(LoginData(response.data));
            console.log(response.data)
        })
        .catch( (error) => {
          console.log(error.message);
        });
    }
}

export function validateInputLogin(parametersurl, token , email , password){
    if(email == null || email.length == 0 || email.length < 4){
        return dispatch  => {
            dispatch(LoginData("Email is not Correct"));
        }
    }else {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if(reg.test(email) === false){
            return dispatch  => {
                dispatch(LoginData("Email is not Correct"));
            }
        }
    }
    if(password == null || password.length == 0 || password.length < 6){
        return dispatch  => {
            dispatch(LoginData("Password is not Correct"));
        }
    }
    return dispatch  => {
        dispatch(LoginCustomer( parametersurl, token, email, password));
    }
    
}

export function LoginData(result){
    return{
        type: 'DATA_LOGIN',
        LoginCustomerData: result
    }
}