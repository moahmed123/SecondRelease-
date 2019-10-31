import axios from 'axios';

export function Settings( urlStore, Token ){
    return(dispatch) => {
        return axios.post(urlStore, {            
            token: Token    
        })
        .then((response) => {
            dispatch(SettingsData(response.data));            
            console.log(response.data)
        })
        .catch( (error) => {
          console.log(error.message);
        });
    }
}

export function SettingsData(result){
    return{
        type: 'SETTING_DATA',
        SettingsData: result
    }
}