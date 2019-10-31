import axios from 'axios';

export function EditCustomer( parametersurl, token, email, password,firstname, lastname){
    return(dispatch) => {
        return axios.post(parametersurl, {
            token: token ,
            email: email,
            firstname: firstname,
            lastname: lastname,
            password: password,              
        })
        .then((response) => {
            dispatch(EditCustomerData(response.data));
            console.log(response.data)
        })
        .catch( (error) => {
          console.log(error.message);
        });
    }
}

export function EditCustomerData(result){
    return{
        type: 'EDIT_DATA',
        EditCustomer: result
    }
}