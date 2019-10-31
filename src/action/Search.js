import axios from 'axios';

export function Search( urlStore, Token, filterText ){
    return(dispatch) => {
        return axios.post(urlStore, {            
            token: Token,
            category_id: "",
            filterText: filterText,
            start: "",
            limit: ""
        })
        .then((response) => {
            dispatch(SearchProducts(response.data));            
            console.log(response.data)
        })
        .catch( (error) => {
          console.log(error.message);
        });
    }
}

export function SearchProducts(result){
    return{
        type: 'SEARCH_DATA',
        SearchProducts: result
    }
}