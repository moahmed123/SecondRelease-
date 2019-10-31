import axios from 'axios';

export function SwitchLanguage( urlStore, Token, languageCode){
    return(dispatch) => {
        return axios.post(urlStore, {            
            token: Token,
            language_code: languageCode  
        })
        .then((response) => {
            dispatch(LanguageData(response.data));            
            console.log(response.data)
        })
        .catch( (error) => {
          console.log(error.message);
        });
    }
}

export function LanguageData(result){
    return{
        type: 'LANGUAGE_DATA',
        LanguageData: result
    }
}