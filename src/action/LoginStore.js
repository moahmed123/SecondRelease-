import axios from 'axios';

export function LoginStore( parametersurl, username, Pass ){
    return(dispatch) => {
        return axios.post(parametersurl, {            
            username: username,
            password: Pass            
        })
        .then((response) => {
            dispatch(getData(response.data));
            console.log(response.data)
        })
        .catch( (error) => {
          console.log(error.message);
        });
    }
}

export function getData(result){
    return{
        type: 'All_DATA',
        dataType: result
    }
}