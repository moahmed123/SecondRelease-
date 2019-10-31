import axios from 'axios';

export function Register( parametersurl, token, firstName, lastName, email, password ){    
    return(dispatch) => {
        return axios.post(parametersurl, {
            token: token ,
            firstname: firstName,
            lastname: lastName,
            email: email,
            password: password 
        })
        .then((response) => {                        
            dispatch(RegisterCustomer(response.data));            
            console.log(response.data);
        })
        .catch( (error) => {
          console.log(error.message);
        });
    }
}

export function validateInput(parametersurl, token, firstName , lastName , email , password){
    if(firstName == null || firstName.length == 0 || firstName.length < 4){
        return dispatch  => {
            dispatch(RegisterCustomer("First name is not Correct"));            
        }        
    }
    if(lastName == null || lastName.length == 0 || lastName.length < 2){
        return dispatch  => {
            dispatch(RegisterCustomer("Last name is not Correct"));
        }        
    }
    if(email == null || email.length == 0 || email.length < 4){
        return dispatch  => {
            dispatch(RegisterCustomer("Email is not Correct"));
        }
    }else {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if(reg.test(email) === false){
            return dispatch  => {
                dispatch(RegisterCustomer("Email is not Correct"));
            }
        }
    }
    if(password == null || password.length == 0 || password.length < 6){
        return dispatch  => {
            dispatch(RegisterCustomer("Password is not Correct"));
        }
    }
    return dispatch  => {
        dispatch(Register( parametersurl, token, firstName, lastName, email, password));
    }
    
}

export function RegisterCustomer(result){
    return{
        type: 'DATA_REGISTER',
        RegisterCustomer: result
    }
}