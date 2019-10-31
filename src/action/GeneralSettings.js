import axios from 'axios';

export function GeneralSetting( urlStore, Token ){
    return(dispatch) => {
        return axios.post(urlStore, {            
            token: Token    
        })
        .then((response) => {
            dispatch(GeneralData(response.data));            
            console.log(response.data)
        })
        .catch( (error) => {
          console.log(error.message);
        });
    }
}

export function GeneralData(result){
    return{
        type: 'GENERAL_DATA',
        GeneralData: result
    }
}