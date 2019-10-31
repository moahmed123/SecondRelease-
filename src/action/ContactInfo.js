import axios from 'axios';

export function ContactInfo( parametersurl, token){
    return(dispatch) => {
        return axios.post(parametersurl, {token: token})
        .then((response) => {
            dispatch(Contact_Info_Data(response.data));
            console.log(response.data)
        })
        .catch( (error) => {
          console.log(error.message);
        });
    }
}

export function Contact_Info_Data(result){
    return{
        type: 'CONTACT_INFO_RESULT',
        ContactInfoResult: result
    }
}