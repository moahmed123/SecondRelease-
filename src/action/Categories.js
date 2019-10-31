import axios from 'axios';

export function Categories( parametersurl, token){
    return(dispatch) => {
        return axios.post(parametersurl, {
            token: token             
        })
        .then((response) => {
            dispatch(CategoriesImageData(response.data));
            console.log(response.data)
        })
        .catch( (error) => {
          console.log(error.message);
        });
    }
}

export function CategoriesImageData(result){
    return{
        type: 'CATEGORIES_IMAGE_DATA',
        CategoriesResult: result
    }
}