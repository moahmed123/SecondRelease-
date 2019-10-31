import axios from 'axios';

export function HomeStore( urlStore, Token ){
    return(dispatch) => {
        return axios.post(urlStore, {            
            token: Token    
        })
        .then((response) => {
            dispatch(HomeData(response.data));            
            console.log(response.data)
        })
        .catch( (error) => {
          console.log(error.message);
        });
    }
}

export function HomeData(result){
    return{
        type: 'HOME_DATA',
        HomeData: result
    }
}